import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      MailUsuario: ['', Validators.required, Validators.email],
      PasswordUsuario: ['', Validators.required]
    })
  }

  login(/*user: User*/){
    const usuario: Usuario = {
      MailUsuario: this.form.value.MailUsuario,
      PasswordUsuario: this.form.value.PasswordUsuario,
      RolUsuario: 'null',
    }
    this.authService.login(usuario).subscribe((token: string) =>{
      localStorage.setItem('authToken', token);
      this.mensajeExito();
      this.router.navigate(['/listadoProducto']);
    });
  }

  mensajeExito(){
    this._snackBar.open('Session iniciada correctamente', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  ngOnInit(): void {
  }

}
