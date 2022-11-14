import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDireccion } from 'src/app/interfaces/usuario.direccion';
import { UsuarioDireccionService } from 'src/app/services/usuario.direccion.service';

@Component({
  selector: 'app-agregar-editar-usuario-direccion',
  templateUrl: './agregar-editar-usuario-direccion.component.html',
  styleUrls: ['./agregar-editar-usuario-direccion.component.css']
})
export class AgregarEditarUsuarioDireccionComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: number;
  idDireccion: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private _usuarioDireccionService: UsuarioDireccionService, private router: Router, private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      direccionUsuario: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: [''],
      pais: ['', Validators.required],
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.idDireccion = Number(this.aRoute.snapshot.paramMap.get('idDireccion'));
  }

  ngOnInit(): void {
    if(this.idDireccion != 0){
      this.operacion = 'Editar';
      this.obtenerDireccion(this.idDireccion);
    }
  }

  obtenerDireccion(id: number){
    this.loading = true;
    this._usuarioDireccionService.getDireccion(id).subscribe( data => {
      this.form.patchValue({
        direccionUsuario: data.direccionUsuario,
        ciudad: data.ciudad,
        provincia: data.provincia,
        pais: data.pais,
      })
      this.loading = false;
    })
  }

  agregarEditarDireccion(){
    const usuarioDireccion: UsuarioDireccion = {
      usuarioId: this.id,
      direccionUsuario: this.form.value.direccionUsuario,
      ciudad: this.form.value.ciudad,
      provincia: this.form.value.provincia,
      pais: this.form.value.pais,
    }

    if(this.idDireccion != 0){
      usuarioDireccion.idUsuarioDireccion = this.idDireccion;
      this.editarDireccion(this.idDireccion, usuarioDireccion);
    }
    else{
      this.agregarDireccion(usuarioDireccion);
    }
  }

  editarDireccion(id: number, usuarioDireccion: UsuarioDireccion){
    this.loading = true;
    this._usuarioDireccionService.updateDireccion(id, usuarioDireccion).subscribe({
      next: () => {
        this.loading = false;
        this.mensajeExito('actualizada');
        this.volverPerfil();
      },
      error: (e) => {
        this.loading = false;
        alert('Direccion existente')},
      complete: () => console.info('Complete')
    })
  }

  agregarDireccion(usuarioDireccion: UsuarioDireccion){
    this.loading = true;
    this._usuarioDireccionService.addUsuarioDireccion(usuarioDireccion).subscribe({
      next: () => {
        this.loading = false;
        this.mensajeExito('registrada');
        this.volverPerfil();
      },
      error: (e) => {
        this.loading = false;
        alert('Direccion existente')},
      complete: () => console.info('Complete')
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
