import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoInventario } from 'src/app/interfaces/producto.inventario';
import { ProductoInventarioService } from 'src/app/services/producto.inventario.service';
@Component({
  selector: 'app-agregar-editar-producto-inventario',
  templateUrl: './agregar-editar-producto-inventario.component.html',
  styleUrls: ['./agregar-editar-producto-inventario.component.css']
})
export class AgregarEditarProductoInventarioComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup;
  id: number;
  idInventario: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private _productoInventarioService: ProductoInventarioService, private router: Router, private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombreProductoInventario: ['', Validators.required],
      cantidadProductoInventario: ['0'],
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.idInventario = Number(this.aRoute.snapshot.paramMap.get('idInventario'));
  }

  ngOnInit(): void {
    if(this.idInventario != 0){
      this.operacion = 'Editar';
      this.obtenerInventario(this.idInventario);
    }
  }

  obtenerInventario(id: number){
    this.loading = true;
    this._productoInventarioService.getInventario(id).subscribe( data => {
      this.form.patchValue({
        nombreProductoInventario: data.nombreProductoInventario,
        cantidadProductoInventario: data.cantidadProductoInventario,
      })
      this.loading = false;
    })
  }

  agregarEditarInventario(){
    const productoInventario: ProductoInventario = {
      productoId: this.id,
      nombreProductoInventario: this.form.value.nombreProductoInventario,
      cantidadProductoInventario: this.form.value.cantidadProductoInventario,
    }

    if(this.idInventario != 0){
      productoInventario.idProductoInventario = this.idInventario;
      this.editarInventario(this.idInventario, productoInventario);
    }
    else{
      this.agregarInventario(productoInventario);
    }
  }

  editarInventario(id: number, productoInventario: ProductoInventario){
    this.loading = true;
    this._productoInventarioService.updateInventario(id, productoInventario).subscribe( () => {
      this.loading = false;
      this.mensajeExito('actualizado');
      this.router.navigate(['/editarProducto/' + this.id]);
    })
  }

  agregarInventario(productoInventario: ProductoInventario){
    this.loading = true;
    this._productoInventarioService.addInventario(productoInventario).subscribe(data => {
      this.loading = false;
      this.mensajeExito('registrado');
      this.router.navigate(['/editarProducto/' + this.id]);
    })
  }
  mensajeExito(texto: string){
    this._snackBar.open(`El almacen fue ${texto} con exito`, '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
