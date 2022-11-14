import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  tienda(){
    if(localStorage.getItem('rolUsuario') == 'admin') this.router.navigate(['/listadoProducto']);

    if(localStorage.getItem('rolUsuario') == 'usuario') this.router.navigate(['usuario/listadoProducto']);
  }

  cerrarSession(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

}
