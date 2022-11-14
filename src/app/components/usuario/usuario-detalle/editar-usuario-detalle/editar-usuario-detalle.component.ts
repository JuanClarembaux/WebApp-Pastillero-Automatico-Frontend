import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioRegister } from 'src/app/interfaces/usuario.register';
import { UsuarioDireccion } from 'src/app/interfaces/usuario.direccion';
import { UsuarioTelefono } from 'src/app/interfaces/usuario.telefono';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioDireccionService } from 'src/app/services/usuario.direccion.service';
import { UsuarioTelefonoService } from 'src/app/services/usuario.telefono.service';

@Component({
  selector: 'app-editar-usuario-detalle',
  templateUrl: './editar-usuario-detalle.component.html',
  styleUrls: ['./editar-usuario-detalle.component.css']
})
export class EditarUsuarioDetalleComponent implements OnInit, AfterViewInit {

  DireccionesdisplayedColumns: string[] = ['direccionUsuario', 'ciudad', 'provincia', 'pais', 'acciones'];
  dataSourceDirecciones = new MatTableDataSource<UsuarioDireccion>();
  TelefonosdisplayedColumns: string[] = ['numeroDeTelefono', 'acciones'];
  dataSourceTelefonos = new MatTableDataSource<UsuarioTelefono>();
  loading: boolean = false;
  gridColumns = 3;
  form: FormGroup;
  mail: string;
  id: number

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private _usuarioService: UsuarioService, private router: Router, private aRoute: ActivatedRoute,
            private _usuarioDireccionService: UsuarioDireccionService, private _usuarioTelefonoService: UsuarioTelefonoService,) {
    this.form = this.fb.group({
      mailUsuario: ['', Validators.required],
      passwordUsuario: ['', Validators.required],
      nombreUsuario: [''],
      apellidoUsuario: [''],
      fechaNacimientoUsuario: ['']
    })

    this.mail = String(localStorage.getItem('mailUsuario'));
    this.id = Number(localStorage.getItem('idUsuario'));
  }

  ngOnInit(): void {
    this.obtenerUsuario(this.mail);
    this.obtenerDirecciones();
    this.obtenerTelefonos();
  }
  ngAfterViewInit() {
    this.dataSourceDirecciones.paginator = this.paginator;
    this.dataSourceDirecciones.sort = this.sort;
    if(this.dataSourceDirecciones.data.length > 0){
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
    this.dataSourceTelefonos.paginator = this.paginator;
    this.dataSourceTelefonos.sort = this.sort;
    if(this.dataSourceTelefonos.data.length > 0){
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }

  applyFilterDirecciones(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDirecciones.filter = filterValue.trim().toLowerCase();
  }
  applyFilterTelefonos(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTelefonos.filter = filterValue.trim().toLowerCase();
  }


  setIdUsuario(mail: string){
    this._usuarioService.getUsuarioByEmail(mail).subscribe( data => {
      console.log(data.idUsuario);
      console.log(Number(data.idUsuario));
      return Number(data.idUsuario);
    })
  }

  obtenerUsuario(mail: string){
    this.loading = true;

    this._usuarioService.getUsuarioByEmail(mail).subscribe( data => {
      this.obtenerDatosUsuario(Number(data.idUsuario));
      //localStorage.setItem('idUsuario', String(data.idUsuario))
    })
  }

  obtenerDatosUsuario(id: number){
    this.loading = true;

    this._usuarioService.getUsuario(id).subscribe( data => {
      this.form.patchValue({
        mailUsuario: data.mailUsuario,
        passwordUsuario: data.passwordUsuario,
        nombreUsuario: data.nombreUsuario,
        apellidoUsuario: data.apellidoUsuario,
        fechaNacimientoUsuario: data.fechaNacimientoUsuario
      })
      this.loading = false;
    })
  }
  editarUsuario(){
    const usuarioEditar: UsuarioRegister = {
      mailUsuario: this.form.value.mailUsuario,
      passwordUsuario: this.form.value.passwordUsuario,
      nombreUsuario: this.form.value.nombreUsuario,
      apellidoUsuario: this.form.value.apellidoUsuario,
      fechaNacimientoUsuario: this.form.value.fechaNacimientoUsuario
    }
    usuarioEditar.idUsuario = Number(localStorage.getItem('idUsuario'));
    this.loading = true;
    this._usuarioService.updateUsuario(usuarioEditar.idUsuario, usuarioEditar).subscribe( () => {
      this.loading = false;
      this.mensajeExito('actualizado');
      this.router.navigate(['/listadoProducto']);
    })
  }


  obtenerDirecciones(){
    this.loading = true;
    this._usuarioDireccionService.getDirecciones(Number(localStorage.getItem('idUsuario'))).subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSourceDirecciones.data = data;
      },
      error: (e) => {
        this.loading = false
        alert('Ocurrio un Error')},
      complete: () => console.info('Complete')
    })
  }
  eliminarDireccion(id: number){
    this.loading = true;

    this._usuarioDireccionService.deleteDireccion(id).subscribe(() => {
      this._snackBar.open(`Direccion eliminada con exito`, '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.loading = false;
      this.obtenerDirecciones();
    });
  }
  agregarDireccion(){
    this.router.navigate(['usuario/editarUsuario/' + localStorage.getItem('idUsuario') + '/agregar-usuario-direccion']);
  }
  editarDireccion(id: number){
    this.router.navigate(['usuario/editarUsuario/' + localStorage.getItem('idUsuario') + '/editar-usuario-direccion/' + id]);
  }

  obtenerTelefonos(){
    this.loading = true;
    this._usuarioTelefonoService.getTelefonos(Number(localStorage.getItem('idUsuario'))).subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSourceTelefonos.data = data;
      },
      error: (e) => {
        this.loading = false
        alert('Ocurrio un Error')},
      complete: () => console.info('Complete')
    })
  }
  eliminarTelefono(id: number){
    this.loading = true;

    this._usuarioTelefonoService.deleteTelefono(id).subscribe(() => {
      this._snackBar.open(`Telefono eliminado con exito`, '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.loading = false;
      this.obtenerTelefonos();
    });
  }
  agregarTelefono(){
    this.router.navigate(['usuario/editarUsuario/' + localStorage.getItem('idUsuario') + '/agregar-usuario-telefono']);
  }
  editarTelefono(id: number){
    this.router.navigate(['usuario/editarUsuario/' + localStorage.getItem('idUsuario') + '/editar-usuario-telefono/' + id]);
  }

  volverVerPerfil(){
    this.router.navigate(['usuario/verUsuario/' + localStorage.getItem('idUsuario')]);
  }

  cerrarSession(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }


  mensajeExito(texto: string){
    this._snackBar.open(`El usuario fue ${texto} con exito`, '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
