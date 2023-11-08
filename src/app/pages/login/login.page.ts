import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './../../auth-service.service';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  pass: string = '';
  profesor: string = '@profesorduoc.cl';
  alumno: string = '@duoc.cl';
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {}


  async login() {
    console.log(`Usuario: ${this.usuario}`);
    console.log(`Contraseña: ${this.pass}`);
  
    // Autenticación con el servidor
    this.http
      .post('http://osolices.pythonanywhere.com/login/', {
        correo: this.usuario,
        pass_field: this.pass,
      })
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            // Muestra la alerta de usuario incorrecto
            this.mostrarAlerta();
          }
          return throwError(error);
        })
      )
      .subscribe(async (resp: any) => {
        if (resp) {
          // Almacenar los datos del usuario en el almacenamiento local
          this.authService.login(resp); // Utiliza el método de inicio de sesión del servicio
  
          // Redirigir al usuario a la página correspondiente
          if (this.usuario.includes(this.profesor)) {
            console.log('Redirigiendo a /dashboard-profesor');
            this.router.navigate(['/dashboard-profesor']);
          } else if (this.usuario.includes(this.alumno)) {
            console.log('Redirigiendo a /dashboard-alumno');
            this.router.navigate(['/dashboard-alumnos']);
          }
        } else {
          this.mostrarAlerta();
        }
      });
  }
  


  async mostrarAlerta() {
    console.log('Mostrando alerta');
    let alerta = this.toastCtrl.create({
      message: 'Usuario o contraseña incorrecto',
      duration: 2000,
      position: 'bottom',
    });
    (await alerta).present();
  }
}
