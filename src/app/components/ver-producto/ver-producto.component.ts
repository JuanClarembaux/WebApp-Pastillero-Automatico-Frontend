import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  id: number;
  producto!: Producto;
  loading: boolean = false;
  cantidad: number = 0;

  //producto$!: Observable<Producto> /*  El simbolo $ se usa para distinguir los objetos de tipo Observable y el ! es para inicializar la variable en null  */

  constructor(private _productoService: ProductoService, private _snackBar: MatSnackBar, private router: Router ,private aRoute: ActivatedRoute) {
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

  mensajeExito(){
    this._snackBar.open('Factura generada correctamente', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  cerrarSession(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }


  aumentarCantidad(){
    this.cantidad += 1;
  }
  disminuirCantidad(){
    if(this.cantidad > 0) this.cantidad -= 1;
  }

  createPDF(){

    const pdfDefinition: any = {
      content: [
        {text: 'PASTIMATIC S.R.L', style: 'header'},
        {text: 'Informacion', style: 'subheader'},
        'Direccion: xxxxxx xxxx',
        'Telefono: xxxx-xxxxxx',
        {
          style: 'tableExample', colSpan: 2,
          table: {
            widths: [25, 225, 60, 50 , 50, 75], headerRows: 2, rowSpan: 3,
            body: [
              ['id', 'Producto', 'Marca', 'Cantidad', 'Precio Unitario', 'Importe'],
              [
                {
                  stack: [
                    {
                      ul: [
                        this.producto.idProducto
                      ]
                    }
                  ]
                },
                {
                  stack: [
                    {
                      ul: [
                        this.producto.nombreProducto
                      ]
                    }
                  ]
                },
                {
                  stack: [
                    {
                      ul: [
                        this.producto.marcaProducto
                      ]
                    }
                  ]
                },
                {
                  stack: [
                    {
                      ul: [
                        this.cantidad
                      ]
                    }
                  ]
                },
                {
                  stack: [
                    {
                      ul: [
                        this.producto.precioProducto
                      ]
                    }
                  ]
                },
                {
                  stack: [
                    {
                      ul: [
                        this.producto.precioProducto * this.cantidad
                      ]
                    }
                  ]
                },
              ],
              ['', '', '', '', 'Total', this.producto.precioProducto * this.cantidad],
            ]
          }
        },

      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }
}
