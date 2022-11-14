import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;

  //mail: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute, private _usuarioService: UsuarioService) {
    this.form = this.fb.group({
      mailUsuario: ['', Validators.required, Validators.email],
      passwordUsuario: ['', Validators.required]
    })
    //this.mail = String(localStorage.getItem('mailUsuario'));
  }

  login(/*user: User*/){
    this.loading = true;

    const usuario: Usuario = {
      mailUsuario: this.form.value.mailUsuario,
      passwordUsuario: this.form.value.passwordUsuario,
      rolUsuario:''
    }
    this.authService.login(usuario).subscribe({
      next: (token: string) => {
        this.loading = false;

        localStorage.setItem('authToken', token);

        this._usuarioService.getUsuarioByEmail(usuario.mailUsuario).subscribe( data => {
          localStorage.setItem('idUsuario', String(data.idUsuario))
          localStorage.setItem('rolUsuario', data.rolUsuario);
        })

        localStorage.setItem('mailUsuario', usuario.mailUsuario);
        this.mensajeExito();
        this.router.navigate(['/home']);
      },
      error: (e) => {
        this.loading = false;
        alert('Mail o Password incorrecto.')},
      complete: () => console.info('Complete')
    })
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
