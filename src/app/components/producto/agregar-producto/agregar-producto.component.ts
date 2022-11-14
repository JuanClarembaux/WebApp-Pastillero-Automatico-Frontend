import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoCreacion } from 'src/app/interfaces/producto.creacion';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private _productoService: ProductoService, private router: Router, private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombreProducto: ['', Validators.required],
      marcaProducto: ['', Validators.required],
      descripcionProducto: ['', Validators.required],
      categoriaProducto: ['', Validators.required],
      precioProducto: ['', Validators.required],
      skuProducto: [''],
      nombreProductoInventario: ['Almacen Principal'],
      cantidadProductoInventario: ['']
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }

  obtenerProducto(id: number){
    this.loading = true;
    this._productoService.getProducto(id).subscribe( data => {
      console.log(data);
      this.form.patchValue({
        nombreProducto: data.nombreProducto,
        marcaProducto: data.marcaProducto,
        descripcionProducto: data.descripcionProducto,
        categoriaProducto: data.categoriaProducto,
        precioProducto: data.precioProducto,
        skuProducto: data.skuProducto
      })
      this.loading = false;
    })
  }
  agregarProducto(){
    const productoAgregar: ProductoCreacion = {
      NombreProducto: this.form.value.nombreProducto,
      MarcaProducto: this.form.value.marcaProducto,
      DescripcionProducto: this.form.value.descripcionProducto,
      CategoriaProducto: this.form.value.categoriaProducto,
      PrecioProducto: this.form.value.precioProducto,
      SkuProducto: this.form.value.skuProducto,
      NombreProductoInventario: this.form.value.nombreProductoInventario,
      CantidadProductoInventario: this.form.value.cantidadProductoInventario,
    }
    this._productoService.addProducto(productoAgregar).subscribe(data => {
      this.mensajeExito('registrado');
      this.router.navigate(['/listadoProducto']);
    })
  }
  mensajeExito(texto: string){
    this._snackBar.open(`El producto fue ${texto} con exito`, '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
