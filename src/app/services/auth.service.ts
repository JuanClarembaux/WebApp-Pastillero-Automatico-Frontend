import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { UsuarioRegister } from '../interfaces/usuario.register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/LoginRegister/';

  constructor(private http: HttpClient) { }

  register(usuario: UsuarioRegister): Observable<UsuarioRegister>{
    return this.http.post<UsuarioRegister>( `${this.myAppUrl}${this.myApiUrl}register` /*'https://localhost:7058/api/LoginRegister/register'*/, usuario);
  }

  login(usuario: Usuario): Observable<string>{
    return this.http.post('https://localhost:7058/api/LoginRegister/login', usuario, {responseType: 'text'});
  }
  /*
  public getMe(): Observable<string>{
    return this.http.get('https://localhost:7058/api/LoginRegister', {responseType: 'text',});
  }
  */
}
