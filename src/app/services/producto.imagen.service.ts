import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoImagen } from '../interfaces/producto.imagen';

@Injectable({
  providedIn: 'root'
})
export class ProductoImagenService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/ProductoImagen/';

  constructor(private http: HttpClient) { }

  getImagenes(id: number): Observable<ProductoImagen[]>{
    return this.http.get<ProductoImagen[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getImagen(id: number): Observable<ProductoImagen>{
    return this.http.get<ProductoImagen>(`${this.myAppUrl}${'imagen/'}${this.myApiUrl}${id}`);
  }

  deleteImagen(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateImagen(id: number, ProductoImagen: ProductoImagen): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, ProductoImagen);
  }

}
