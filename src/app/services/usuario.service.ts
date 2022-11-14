import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { UsuarioRegister } from '../interfaces/usuario.register';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Usuario/';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getUsuario(id: number): Observable<UsuarioRegister>{
    return this.http.get<UsuarioRegister>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getUsuarioByEmail(email: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}${'mail/'}${email}`);
  }

  deleteUsuario(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateUsuario(id: number, usuario: UsuarioRegister): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, usuario);
  }

}
