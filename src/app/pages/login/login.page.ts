import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  usuario: string='';
  pass: string='';
  profesor: string='@profesorduoc.cl';
  alumno: string='@duoc.cl';
  constructor(private router: Router,
              private toastCtrl: ToastController,
              private http: HttpClient) { }

ngOnInit() {
}
async login(){
  console.log(`Usuario: ${this.usuario}`);
  console.log(`Contraseña: ${this.pass}`);

  // Redirigir al usuario a la página correspondiente
  if (this.usuario.includes(this.profesor)) {
      // Autenticación con el servidor
      this.http.post('http://127.0.0.1:8000/profesores/', {correo: this.usuario, pass: this.pass}).subscribe(async (resp:any) => {
          if (resp && resp.token) {
              // Almacenar el token en el almacenamiento local del dispositivo
              window.localStorage.setItem('userToken', resp.token);
              console.log('Redirigiendo a /dashboard-profesor');
              this.router.navigate(['/dashboard-profesor']);
          } else {
              this.mostrarAlerta();
          }
      });
  } else if (this.usuario.includes(this.alumno)) {
      this.http.post('http://osolices.pythonanywhere.com/alumnos/', {correo: this.usuario, pass: this.pass}).subscribe(async (resp:any) => {
          if (resp && resp.token) {
              console.log('Redirigiendo a /dashboard-alumno');
              this.router.navigate(['/dashboard-alumnos']);
          } else {
              this.mostrarAlerta();
          }
      });
  } else {
      this.mostrarAlerta();
  }
}

async mostrarAlerta() {
  console.log('Mostrando alerta');
  let alerta = this.toastCtrl.create({
      message: "Usuario o contraseña incorrecto",
      duration: 2000,
      position: 'bottom'
  });
  (await alerta).present();
}

}
