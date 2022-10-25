import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.css']
})
export class ListadoProductoComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombreProducto', 'marcaProducto', 'descripcionProducto', 'categoriaProducto', 'precioProducto', 'skuProducto', 'acciones'];
  dataSource = new MatTableDataSource<Producto>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProducto();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0){
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  //  Version deprecada
  /*obtenerProducto(){
    this.loading = true;
    this._productoService.getProductos().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
    }, error => {
      this.loading = false;
      alert('Ocurrio un Error')
    })
  }*/

  obtenerProducto(){
    this.loading = true;
    this._productoService.getProductos().subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource.data = data;
      },
      error: (e) => {
        this.loading = false
        alert('Ocurrio un Error')},
      complete: () => console.info('Complete')
    })
  }

  eliminarProducto(id: number){
    this.loading = true;

    this._productoService.deleteProducto(id).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerProducto();
    });
  }

  mensajeExito(){
    this._snackBar.open('El producto fue eliminado con exito', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }



  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }



}
