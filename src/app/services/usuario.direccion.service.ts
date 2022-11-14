import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioDireccion } from '../interfaces/usuario.direccion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDireccionService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/UsuarioDireccion/';

  constructor(private http: HttpClient) { }

  getDirecciones(id: number): Observable<UsuarioDireccion[]>{
    return this.http.get<UsuarioDireccion[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getDireccion(id: number): Observable<UsuarioDireccion>{
    return this.http.get<UsuarioDireccion>(`${this.myAppUrl}${this.myApiUrl}${'direccion/'}${id}`);
  }

  addUsuarioDireccion(usuarioDireccion: UsuarioDireccion): Observable<UsuarioDireccion>{
    return this.http.post<UsuarioDireccion>(`${this.myAppUrl}${this.myApiUrl}`, usuarioDireccion)
  }

  deleteDireccion(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateDireccion(id: number, UsuarioDireccion: UsuarioDireccion): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, UsuarioDireccion);
  }

}
