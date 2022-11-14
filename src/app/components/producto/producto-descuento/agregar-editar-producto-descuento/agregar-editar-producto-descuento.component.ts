import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoDescuento } from 'src/app/interfaces/producto.descuento';
import { ProductoDescuentoService } from 'src/app/services/producto.descuento.service';

@Component({
  selector: 'app-agregar-editar-producto-descuento',
  templateUrl: './agregar-editar-producto-descuento.component.html',
  styleUrls: ['./agregar-editar-producto-descuento.component.css']
})
export class AgregarEditarProductoDescuentoComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup;
  id: number;
  idDescuento: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private _productoDescuentoService: ProductoDescuentoService, private router: Router, private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombreProductoDescuento: ['', Validators.required],
      porcentajeProductoDescuento: ['0', Validators.required],
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.idDescuento = Number(this.aRoute.snapshot.paramMap.get('idDescuento'));
  }

  ngOnInit(): void {
    if(this.idDescuento != 0){
      this.operacion = 'Editar';
      this.obtenerDescuento(this.idDescuento);
    }
  }

  obtenerDescuento(id: number){
    this.loading = true;
    this._productoDescuentoService.getDescuento(id).subscribe( data => {
      this.form.patchValue({
        nombreProductoDescuento: data.nombreProductoDescuento,
        porcentajeProductoDescuento: data.porcentajeProductoDescuento,
      })
      this.loading = false;
    })
  }

  agregarEditarDescuento(){
    const productoDescuento: ProductoDescuento = {
      productoId: this.id,
      nombreProductoDescuento: this.form.value.nombreProductoDescuento,
      porcentajeProductoDescuento: this.form.value.porcentajeProductoDescuento,
    }

    if(this.idDescuento != 0){
      productoDescuento.idProductoDescuento = this.idDescuento;
      this.editarDescuento(this.idDescuento, productoDescuento);
    }
    else{
      this.agregarDescuento(productoDescuento);
    }
  }

  editarDescuento(id: number, productoDescuento: ProductoDescuento){
    this.loading = true;
    this._productoDescuentoService.updateDescuento(id, productoDescuento).subscribe({
      next: () => {
        this.loading = false;
        this.mensajeExito('actualizado');
        this.router.navigate(['/editarProducto/' + this.id]);
      },
      error: (e) => {
        this.loading = false;
        alert('Descuento existente')},
      complete: () => console.info('Complete')
    })
  }

  agregarDescuento(productoDescuento: ProductoDescuento){
    this.loading = true;
    this._productoDescuentoService.addProductoDescuento(productoDescuento).subscribe({
      next: () => {
        this.loading = false;
        this.mensajeExito('registrado');
        this.router.navigate(['/editarProducto/' + this.id]);
      },
      error: (e) => {
        this.loading = false;
        alert('Descuento existente')},
      complete: () => console.info('Complete')
    })
  }
  mensajeExito(texto: string){
    this._snackBar.open(`El descuento fue ${texto} con exito`, '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
