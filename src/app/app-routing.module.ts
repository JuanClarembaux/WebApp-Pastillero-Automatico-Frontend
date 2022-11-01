import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//  Componentes
import { LoginComponent } from './components/login-register/login/login.component';
import { RegisterComponent } from './components/login-register/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ListadoProductoComponent } from './components/producto/listado-producto/listado-producto.component';
import { AgregarEditarProductoComponent } from './components/producto/agregar-editar-producto/agregar-editar-producto.component';
import { VerProductoComponent } from './components/producto/ver-producto/ver-producto.component';
import { AgregarEditarProductoDescuentoComponent } from './components/producto/producto-descuento/agregar-editar-producto-descuento/agregar-editar-producto-descuento.component';
import { AgregarEditarProductoInventarioComponent } from './components/producto/producto-inventario/agregar-editar-producto-inventario/agregar-editar-producto-inventario.component';
import { VerUsuarioDetalleComponent } from './components/usuario/usuario-detalle/ver-usuario-detalle/ver-usuario-detalle.component';
import { EditarUsuarioDetalleComponent } from './components/usuario/usuario-detalle/editar-usuario-detalle/editar-usuario-detalle.component';
import { AgregarEditarUsuarioDireccionComponent } from './components/usuario/usuario-direccion/agregar-editar-usuario-direccion/agregar-editar-usuario-direccion.component';
import { AgregarEditarUsuarioTelefonoComponent } from './components/usuario/usuario-telefono/agregar-editar-usuario-telefono/agregar-editar-usuario-telefono.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'listadoProducto', component: ListadoProductoComponent },
  { path: 'agregarProducto', component: AgregarEditarProductoComponent },
  { path: 'verProducto/:id', component: VerProductoComponent },
  { path: 'editarProducto/:id', component: AgregarEditarProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: 'producto/verProducto/:id/agregar-producto-inventario', component: AgregarEditarProductoInventarioComponent },
  { path: 'producto/verProducto/:id/editar-producto-inventario', component: AgregarEditarProductoInventarioComponent },
  { path: 'producto/verProducto/:id/agregar-producto-descuento', component: AgregarEditarProductoDescuentoComponent },
  { path: 'producto/verProducto/:id/editar-producto-descuento', component: AgregarEditarProductoDescuentoComponent },
  { path: 'usuario/verUsuario/:id', component: VerUsuarioDetalleComponent },
  { path: 'usuario/editarUsuario/:id', component: EditarUsuarioDetalleComponent },
  { path: 'usuario/verUsuario/:id/agregar-usuario-direccion', component: AgregarEditarUsuarioDireccionComponent },
  { path: 'usuario/verUsuario/:id/editar-usuario-direccion', component: AgregarEditarUsuarioDireccionComponent },
  { path: 'usuario/verUsuario/:id/agregar-usuario-telefono', component: AgregarEditarUsuarioTelefonoComponent },
  { path: 'usuario/verUsuario/:id/editar-usuario-telefono', component: AgregarEditarUsuarioTelefonoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
