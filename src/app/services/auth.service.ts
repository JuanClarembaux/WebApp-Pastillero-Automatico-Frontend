import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<any>{
    return this.http.post<any>('https://localhost:7058/api/LoginRegister/register', user);
  }

  public login(user: User): Observable<string>{
    return this.http.post('https://localhost:7058/api/LoginRegister/login', user, {responseType: 'text'});
  }

  public getMe(): Observable<string>{
    return this.http.get('https://localhost:7058/api/LoginRegister', {responseType: 'text',});
  }
}