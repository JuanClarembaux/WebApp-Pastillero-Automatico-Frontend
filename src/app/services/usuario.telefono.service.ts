import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioTelefono } from '../interfaces/usuario.telefono';

@Injectable({
  providedIn: 'root'
})
export class UsuarioTelefonoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/UsuarioTelefono/';

  constructor(private http: HttpClient) { }

  getTelefonos(id: number): Observable<UsuarioTelefono[]>{
    return this.http.get<UsuarioTelefono[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getTelefono(id: number): Observable<UsuarioTelefono>{
    return this.http.get<UsuarioTelefono>(`${this.myAppUrl}${this.myApiUrl}${'telefono/'}${id}`);
  }

  addUsuarioTelefono(usuarioTelefono: UsuarioTelefono): Observable<UsuarioTelefono>{
    return this.http.post<UsuarioTelefono>(`${this.myAppUrl}${this.myApiUrl}`, usuarioTelefono)
  }

  deleteTelefono(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateTelefono(id: number, UsuarioTelefono: UsuarioTelefono): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, UsuarioTelefono);
  }
}
