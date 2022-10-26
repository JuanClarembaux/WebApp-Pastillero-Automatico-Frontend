import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  id: number;
  producto!: Producto;
  loading: boolean = false;

  //producto$!: Observable<Producto> /*  El simbolo $ se usa para distinguir los objetos de tipo Observable y el ! es para inicializar la variable en null  */

  constructor(private _productoService: ProductoService, private _snackBar: MatSnackBar ,private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    /*this.producto$ = this._productoService.getProducto(this.id)  Metodo PIPE ASYNC  */
    this.obtenerProducto();
  }

  obtenerProducto(){
    this.loading = true;
    this._productoService.getProducto(this.id).subscribe(data => {
      this.producto = data;
      this.loading = false;
    })
  }

  generarFactura(/*user: User*/){
    this.loading = true;

    this._productoService.generarPDF(this.producto).subscribe({
      next: () => {
        this.loading = false;
        this.mensajeExito();
      },
      error: (e) => {
        this.loading = false;
        alert('Algo salio mal.')},
      complete: () => console.info('Complete')
    })
  }

  mensajeExito(){
    this._snackBar.open('Factura generada correctamente', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
