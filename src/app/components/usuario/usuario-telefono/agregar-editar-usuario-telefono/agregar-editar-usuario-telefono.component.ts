import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioTelefono } from 'src/app/interfaces/usuario.telefono';
import { UsuarioTelefonoService } from 'src/app/services/usuario.telefono.service';
@Component({
  selector: 'app-agregar-editar-usuario-telefono',
  templateUrl: './agregar-editar-usuario-telefono.component.html',
  styleUrls: ['./agregar-editar-usuario-telefono.component.css']
})
export class AgregarEditarUsuarioTelefonoComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: number;
  idTelefono: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private _usuarioTelefonoService: UsuarioTelefonoService, private router: Router, private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      telefonoUsuario: ['', Validators.required],
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.idTelefono = Number(this.aRoute.snapshot.paramMap.get('idTelefono'));
  }

  ngOnInit(): void {
    if(this.idTelefono != 0){
      this.operacion = 'Editar';
      this.obtenerTelefono(this.idTelefono);
    }
  }

  obtenerTelefono(id: number){
    this.loading = true;
    this._usuarioTelefonoService.getTelefono(id).subscribe( data => {
      this.form.patchValue({
        telefonoUsuario: data.telefonoUsuario,
      })
      this.loading = false;
    })
  }

  agregarEditarTelefono(){
    const usuarioTelefono: UsuarioTelefono = {
      usuarioId: this.id,
      telefonoUsuario: this.form.value.telefonoUsuario,
    }

    if(this.idTelefono != 0){
      usuarioTelefono.idUsuarioTelefono = this.idTelefono;
      this.editarTelefono(this.idTelefono, usuarioTelefono);
    }
    else{
      this.agregarTelefono(usuarioTelefono);
    }
  }

  editarTelefono(id: number, usuarioTelefono: UsuarioTelefono){
    this.loading = true;
    this._usuarioTelefonoService.updateTelefono(id, usuarioTelefono).subscribe( () => {
      this.loading = false;
      this.mensajeExito('actualizado');
      this.volverPerfil();
    })
  }

  agregarTelefono(usuarioTelefono: UsuarioTelefono){
    this.loading = true;
    this._usuarioTelefonoService.addUsuarioTelefono(usuarioTelefono).subscribe(data => {
      this.loading = false;
      this.mensajeExito('registrado');
      this.volverPerfil();
    })
  }

  volverPerfil(){
    this.router.navigate(['usuario/editarUsuario/' + localStorage.getItem('idUsuario')]);
  }

  mensajeExito(texto: string){
    this._snackBar.open(`Direccion ${texto} con exito`, '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
