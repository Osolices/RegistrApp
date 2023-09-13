import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  estudiantes = history.state.estudiantes;

  public estudiantes2 = [
    { nombre: 'Juan Andrade', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { nombre: 'María González', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { nombre: 'Carlos Pérez', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { nombre: 'Ana Martínez', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { nombre: 'Luis Rodríguez', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { nombre: 'Sofía García', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { nombre: 'Antonio López', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { nombre: 'Patricia Torres', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { nombre: 'Ricardo Ramírez', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { nombre: 'Isabel Castro', presente: false, ausente: false, justificado: false, asistencia: 75},
    { nombre: 'Javier Morales', presente: false, ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Teresa Guzmán', presente:false , ausente:false , justificado:false, asistencia: 75},
    { nombre: 'José Herrera', presente:false , ausente:false , justificado:false, asistencia: 75},
    { nombre: 'Carmen Peña', presente:false , ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Francisco Díaz', presente:false , ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Roberto Silva', presente:false , ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Gabriela Soto', presente:false , ausente:false , justificado:false, asistencia: 75},
    { nombre: 'Miguel Paredes', presente:false , ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Lucía Méndez', presente:false , ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Fernando Guerra', presente:false , ausente:false , justificado:false, asistencia: 75},
    { nombre: 'Daniela Ríos', presente:false , ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Jorge Castillo', presente:false , ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Andrea Navarro', presente:false , ausente:false , justificado:false, asistencia: 75},
    { nombre: 'Sergio Vargas', presente:false , ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Cecilia Rojas', presente:false , ausente:false , justificado:false, asistencia: 75},
    { nombre: 'Raúl Torres', presente:false , ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Beatriz Salinas', presente:false , ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Guillermo Peña', presente:false , ausente:false , justificado:false, asistencia: 75},
    { nombre:'Patricia Mora',  presente:false , ausente:false , justificado:false, asistencia: 60},
    { nombre: 'Eduardo Luna', presente:false , ausente:false , justificado:false, asistencia: 60}
];

  
  constructor(private toastController: ToastController, private router: Router) { }

  ngAfterViewInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false
      });
    }
  }
  ngOnInit() {
    this.estudiantes2.forEach(e => {
      e.presente = false;
      e.ausente = true; // inicialmente marca a todos como ausentes
      e.justificado = false;
    });
    this.estudiantes.forEach((e1: any) => {
      this.estudiantes2.forEach((e2: any) => {
        if (e1.nombre === e2.nombre) {
          e2.presente = true;
          e2.ausente = false; // si el estudiante está presente, entonces no está ausente
          e2.justificado = false;
        }
      });
    });
  }

  logOut() {
    this.router.navigate(['/login']);
  }
  async registrar() {
    const toast = await this.toastController.create({
      message: 'Asistencia registrada',
      duration: 2000
    });
    toast.present();
  
    // Redirige al usuario después de que la alerta Toast se haya cerrado
    toast.onDidDismiss().then(() => {
      this.router.navigate(['/dashboard-profesor']);
    });
  }

}

