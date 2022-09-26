import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Producto/';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getProducto(id: number): Observable<Producto>{
    return this.http.get<Producto>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteProducto(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addProducto(producto: Producto): Observable<Producto>{
    return this.http.post<Producto>(`${this.myAppUrl}${this.myApiUrl}`, producto)
  }

  updateProducto(id: number, producto: Producto): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, producto);
  }
}
