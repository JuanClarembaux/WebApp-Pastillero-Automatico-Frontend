import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//  Componentes
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ListadoProductoComponent } from './components/listado-producto/listado-producto.component';
import { AgregarEditarProductoComponent } from './components/agregar-editar-producto/agregar-editar-producto.component';
import { VerProductoComponent } from './components/ver-producto/ver-producto.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
