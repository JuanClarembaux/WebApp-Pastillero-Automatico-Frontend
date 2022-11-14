import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//  Componentes
import { LoginComponent } from './components/login-register/login/login.component';
import { RegisterComponent } from './components/login-register/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ListadoProductoComponent } from './components/producto/listado-producto/listado-producto.component';
import { UsuarioListadoProductoComponent } from './components/producto/usuario-listado-producto/usuario-listado-producto.component';
import { AgregarProductoComponent } from './components/producto/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './components/producto/editar-producto/editar-producto.component';
import { VerProductoComponent } from './components/producto/ver-producto/ver-producto.component';
import { AgregarEditarProductoDescuentoComponent } from './components/producto/producto-descuento/agregar-editar-producto-descuento/agregar-editar-producto-descuento.component';
import { AgregarEditarProductoInventarioComponent } from './components/producto/producto-inventario/agregar-editar-producto-inventario/agregar-editar-producto-inventario.component';
import { VerUsuarioDetalleComponent } from './components/usuario/usuario-detalle/ver-usuario-detalle/ver-usuario-detalle.component';
import { EditarUsuarioDetalleComponent } from './components/usuario/usuario-detalle/editar-usuario-detalle/editar-usuario-detalle.component';
import { AgregarEditarUsuarioDireccionComponent } from './components/usuario/usuario-direccion/agregar-editar-usuario-direccion/agregar-editar-usuario-direccion.component';
import { AgregarEditarUsuarioTelefonoComponent } from './components/usuario/usuario-telefono/agregar-editar-usuario-telefono/agregar-editar-usuario-telefono.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'listadoProducto', component: ListadoProductoComponent },
  { path: 'usuario/listadoProducto', component: UsuarioListadoProductoComponent },
  { path: 'agregarProducto', component: AgregarProductoComponent },
  { path: 'editarProducto/:id', component: EditarProductoComponent },
  { path: 'verProducto/:id', component: VerProductoComponent },
  { path: 'editarProducto/:id/agregar-producto-inventario', component: AgregarEditarProductoInventarioComponent },
  { path: 'editarProducto/:id/editar-producto-inventario/:idInventario', component: AgregarEditarProductoInventarioComponent },
  { path: 'editarProducto/:id/agregar-producto-descuento', component: AgregarEditarProductoDescuentoComponent },
  { path: 'editarProducto/:id/editar-producto-descuento/:idDescuento', component: AgregarEditarProductoDescuentoComponent },
  { path: 'usuario/verUsuario/:id', component: VerUsuarioDetalleComponent },
  { path: 'usuario/editarUsuario/:id', component: EditarUsuarioDetalleComponent },
  { path: 'usuario/editarUsuario/:id/agregar-usuario-direccion', component: AgregarEditarUsuarioDireccionComponent },
  { path: 'usuario/editarUsuario/:id/editar-usuario-direccion/:idDireccion', component: AgregarEditarUsuarioDireccionComponent },
  { path: 'usuario/editarUsuario/:id/agregar-usuario-telefono', component: AgregarEditarUsuarioTelefonoComponent },
  { path: 'usuario/editarUsuario/:id/editar-usuario-telefono/:idTelefono', component: AgregarEditarUsuarioTelefonoComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
