import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';
import { ProductoCreacion } from '../interfaces/producto.creacion';

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

  addProducto(ProductoCreacion: ProductoCreacion): Observable<ProductoCreacion>{
    return this.http.post<ProductoCreacion>(`${this.myAppUrl}${this.myApiUrl}`, ProductoCreacion)
  }

  updateProducto(id: number, producto: Producto): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, producto);
  }

  generarPDF(producto: Producto): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}/facturaPDF`, producto);
  }
}
