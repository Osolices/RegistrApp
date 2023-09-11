import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  usuario: string='';
  pass: string='';
  profesor: string='@profesor.duoc.cl';
  alumno: string='@duoc.cl';
  constructor(private router: Router,
              private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async irMenu(){
    console.log(`Usuario: ${this.usuario}`);
    console.log(`Contraseña: ${this.pass}`);
    if (this.usuario.includes(this.profesor) && this.pass =="12345" ){
      console.log('Redirigiendo a /dashboard-profesor');
      this.router.navigate(['/dashboard-profesor'])
    } else if (this.usuario.includes(this.alumno) && this.pass =="12345" ){
      console.log('Redirigiendo a /dashboard-alumno');
      this.router.navigate(['/dashboard-alumnos'])
    } else{
      console.log('Mostrando alerta');
      let alerta = this.toastCtrl.create({
        message: "Usuario o contraseña incorrecto",
        duration: 2000,
        position: 'bottom'
      });
      (await alerta).present();
    }
  }
}
