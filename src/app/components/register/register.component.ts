import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      MailUsuario: ['', Validators.required, Validators.email],
      PasswordUsuario: ['', Validators.required]
    })
  }

  register(/*user: User*/){
    this.loading = true;

    const usuario: Usuario = {
      MailUsuario: this.form.value.MailUsuario,
      PasswordUsuario: this.form.value.PasswordUsuario,
      RolUsuario: 'null',
    }
    this.authService.register(usuario).subscribe({
      next: () => {
        this.loading = false;
        this.mensajeExito();
        this.router.navigate(['/login']);
      },
      error: (e) =>{
        this.loading = false;
        alert('Usuario existente')},
      complete: () => console.info('Complete')
    })
  }

  mensajeExito(){
    this._snackBar.open('El usuario fue registrado con exito', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  ngOnInit(): void {
  }

}
