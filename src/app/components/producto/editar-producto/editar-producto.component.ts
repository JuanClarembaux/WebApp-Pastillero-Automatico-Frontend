import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoInventario } from 'src/app/interfaces/producto.inventario';
import { ProductoDescuento } from 'src/app/interfaces/producto.descuento';
import { ProductoInventarioService } from 'src/app/services/producto.inventario.service';
import { ProductoDescuentoService } from 'src/app/services/producto.descuento.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit, AfterViewInit {

  InventariodisplayedColumns: string[] = ['nombreProductoInventario', 'cantidadProductoInventario', 'acciones'];
  dataSourceInventario = new MatTableDataSource<ProductoInventario>();
  DescuentodisplayedColumns: string[] = ['nombreProductoDescuento', 'porcentajeProductoDescuento', 'acciones'];
  dataSourceDescuento = new MatTableDataSource<ProductoDescuento>();
  loading: boolean = false;
  form: FormGroup;
  id: number;
  operacion: string = 'Editar';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private _productoService: ProductoService, private router: Router, private aRoute: ActivatedRoute,
    private _productoInventarioService: ProductoInventarioService, private _productoDescuentoService: ProductoDescuentoService,) {
    this.form = this.fb.group({
      nombreProducto: ['', Validators.required],
      marcaProducto: ['', Validators.required],
      descripcionProducto: ['', Validators.required],
      categoriaProducto: ['', Validators.required],
      precioProducto: ['', Validators.required],
      skuProducto: ['']
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
      this.obtenerProducto(this.id);
      this.obtenerInventario();
      this.obtenerDescuento();
  }
  ngAfterViewInit() {
    this.dataSourceInventario.paginator = this.paginator;
    this.dataSourceInventario.sort = this.sort;
    if(this.dataSourceInventario.data.length > 0){
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
    this.dataSourceDescuento.paginator = this.paginator;
    this.dataSourceDescuento.sort = this.sort;
    if(this.dataSourceDescuento.data.length > 0){
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }

  applyFilterDirecciones(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInventario.filter = filterValue.trim().toLowerCase();
  }
  applyFilterTelefonos(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDescuento.filter = filterValue.trim().toLowerCase();
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
  editarProducto(){
    const productoEditar: Producto = {
      nombreProducto: this.form.value.nombreProducto,
      marcaProducto: this.form.value.marcaProducto,
      descripcionProducto: this.form.value.descripcionProducto,
      categoriaProducto: this.form.value.categoriaProducto,
      precioProducto: this.form.value.precioProducto,
      skuProducto: this.form.value.skuProducto,
    }
    if(this.id != 0){
      productoEditar.idProducto = this.id;
      this.loading = true;
      this._productoService.updateProducto(this.id, productoEditar).subscribe({
        next: () => {
          this.loading = false;
          this.mensajeExito('actualizado');
          this.router.navigate(['/listadoProducto']);
        },
        error: (e) => {
          this.loading = false;
          alert('Producto existente')},
        complete: () => console.info('Complete')
      })
    }
  }


  obtenerInventario(){
    this.loading = true;
    this._productoInventarioService.getInventarios(this.id).subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSourceInventario.data = data;
      },
      error: (e) => {
        this.loading = false
        alert('Ocurrio un Error')},
      complete: () => console.info('Complete')
    })
  }
  eliminarInventario(id: number){
    this.loading = true;
    this._productoInventarioService.deleteInventario(id).subscribe(() => {
      this._snackBar.open(`Inventario eliminado con exito`, '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.loading = false;
      this.obtenerProducto(this.id);
      this.obtenerInventario();
      this.obtenerDescuento();
    });
  }

  obtenerDescuento(){
    this.loading = true;
    this._productoDescuentoService.getDescuentos(this.id).subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSourceDescuento.data = data;
      },
      error: (e) => {
        this.loading = false
        alert('Ocurrio un Error')},
      complete: () => console.info('Complete')
    })
  }
  eliminarDescuento(id: number){
    this.loading = true;

    this._productoDescuentoService.deleteDescuento(id).subscribe(() => {
      this._snackBar.open(`Descuento eliminado con exito`, '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.loading = false;
      this.obtenerProducto(this.id);
      this.obtenerInventario();
      this.obtenerDescuento();
    });
  }

  cerrarSession(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  mensajeExito(texto: string){
    this._snackBar.open(`El producto fue ${texto} con exito`, '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
