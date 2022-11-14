import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoInventario } from '../interfaces/producto.inventario';

@Injectable({
  providedIn: 'root'
})
export class ProductoInventarioService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/ProductoInventario/';

  constructor(private http: HttpClient) { }

  getInventarios(id: number): Observable<ProductoInventario[]>{
    return this.http.get<ProductoInventario[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getInventario(id: number): Observable<ProductoInventario>{
    return this.http.get<ProductoInventario>(`${this.myAppUrl}${this.myApiUrl}${'inventario/'}${id}`);
  }

  addInventario(ProductoInventario: ProductoInventario): Observable<ProductoInventario>{
    return this.http.post<ProductoInventario>(`${this.myAppUrl}${this.myApiUrl}`, ProductoInventario)
  }

  deleteInventario(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateInventario(id: number, ProductoInventario: ProductoInventario): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, ProductoInventario);
  }

}
