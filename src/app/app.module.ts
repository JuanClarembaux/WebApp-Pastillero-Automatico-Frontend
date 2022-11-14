import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

//  Modulos
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//  Componentes
import { EditarProductoComponent } from './components/producto/editar-producto/editar-producto.component';
import { ListadoProductoComponent } from './components/producto/listado-producto/listado-producto.component';
import { VerProductoComponent } from './components/producto/ver-producto/ver-producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginComponent } from './components/login-register/login/login.component';
import { RegisterComponent } from './components/login-register/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { VerUsuarioDetalleComponent } from './components/usuario/usuario-detalle/ver-usuario-detalle/ver-usuario-detalle.component';
import { EditarUsuarioDetalleComponent } from './components/usuario/usuario-detalle/editar-usuario-detalle/editar-usuario-detalle.component';
import { VerUsuarioDireccionComponent } from './components/usuario/usuario-direccion/ver-usuario-direccion/ver-usuario-direccion.component';
import { AgregarEditarUsuarioDireccionComponent } from './components/usuario/usuario-direccion/agregar-editar-usuario-direccion/agregar-editar-usuario-direccion.component';
import { VerUsuarioTelefonoComponent } from './components/usuario/usuario-telefono/ver-usuario-telefono/ver-usuario-telefono.component';
import { AgregarEditarUsuarioTelefonoComponent } from './components/usuario/usuario-telefono/agregar-editar-usuario-telefono/agregar-editar-usuario-telefono.component';
import { VerProductoDescuentoComponent } from './components/producto/producto-descuento/ver-producto-descuento/ver-producto-descuento.component';
import { AgregarEditarProductoDescuentoComponent } from './components/producto/producto-descuento/agregar-editar-producto-descuento/agregar-editar-producto-descuento.component';
import { VerProductoInventarioComponent } from './components/producto/producto-inventario/ver-producto-inventario/ver-producto-inventario.component';
import { AgregarEditarProductoInventarioComponent } from './components/producto/producto-inventario/agregar-editar-producto-inventario/agregar-editar-producto-inventario.component';
import { AgregarProductoComponent } from './components/producto/agregar-producto/agregar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    EditarProductoComponent,
    ListadoProductoComponent,
    VerProductoComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutUsComponent,
    VerUsuarioDetalleComponent,
    EditarUsuarioDetalleComponent,
    VerUsuarioDireccionComponent,
    AgregarEditarUsuarioDireccionComponent,
    VerUsuarioTelefonoComponent,
    AgregarEditarUsuarioTelefonoComponent,
    VerProductoDescuentoComponent,
    AgregarEditarProductoDescuentoComponent,
    VerProductoInventarioComponent,
    AgregarEditarProductoInventarioComponent,
    AgregarProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
