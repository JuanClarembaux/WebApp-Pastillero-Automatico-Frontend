import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoDescuento } from '../interfaces/producto.descuento';

@Injectable({
  providedIn: 'root'
})
export class ProductoDescuentoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/ProductoDescuento/';

  constructor(private http: HttpClient) { }

  getDescuentos(id: number): Observable<ProductoDescuento[]>{
    return this.http.get<ProductoDescuento[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getDescuento(id: number): Observable<ProductoDescuento>{
    return this.http.get<ProductoDescuento>(`${this.myAppUrl}${this.myApiUrl}${'descuento/'}${id}`);
  }

  addProductoDescuento(ProductoDescuento: ProductoDescuento): Observable<ProductoDescuento>{
    return this.http.post<ProductoDescuento>(`${this.myAppUrl}${this.myApiUrl}`, ProductoDescuento)
  }

  deleteDescuento(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateDescuento(id: number, ProductoDescuento: ProductoDescuento): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, ProductoDescuento);
  }

}
