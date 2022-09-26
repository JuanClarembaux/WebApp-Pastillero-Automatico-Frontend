import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-agregar-editar-producto',
  templateUrl: './agregar-editar-producto.component.html',
  styleUrls: ['./agregar-editar-producto.component.css']
})
export class AgregarEditarProductoComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private _productoService: ProductoService, private router: Router, private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required]
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if(this.id != 0){
      this.operacion = 'Editar';
      this.obtenerProducto(this.id);
    }
  }

  obtenerProducto(id: number){
    this.loading = true;

    this._productoService.getProducto(id).subscribe( data => {
      this.form.patchValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        stock: data.stock
      })
      this.loading = false;
    })
  }

  agregarEditarProducto(){
    //  Formas de capturar datos
    //const nombre = this.form.get('nombre')?.value;
    //const nombre = this.form.value.nombre;

    // Armamos el objeto a enviar
    const producto: Producto = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      precio: this.form.value.precio,
      stock: this.form.value.stock
    }

    if(this.id != 0){
      producto.id = this.id;
      this.editarProducto(this.id, producto);
    }
    else{
      this.agregarProducto(producto);
    }
  }

  editarProducto(id: number, producto: Producto){
    this.loading = true;
    this._productoService.updateProducto(id, producto).subscribe( () => {
      this.loading = false;
      this.mensajeExito('actualizado');
      this.router.navigate(['/listadoProducto']);
    })
  }

  agregarProducto(producto: Producto){
    // Enviamos el objeto al Back-End
    this._productoService.addProducto(producto).subscribe(data => {
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
