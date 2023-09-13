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
    { nombre: 'Juan Andrade', presente: false, ausente: false, justificado: false },
    { nombre: 'María González', presente: false, ausente: false, justificado: false },
    { nombre: 'Carlos Pérez', presente: false, ausente: false, justificado: false },
    { nombre: 'Ana Martínez', presente: false, ausente: false, justificado: false },
    { nombre: 'Luis Rodríguez', presente: false, ausente: false, justificado: false },
    { nombre: 'Sofía García', presente: false, ausente: false, justificado: false },
    { nombre: 'Antonio López', presente: false, ausente: false, justificado: false },
    { nombre: 'Patricia Torres', presente: false, ausente: false, justificado: false },
    { nombre: 'Ricardo Ramírez', presente: false, ausente: false, justificado: false },
    { nombre: 'Isabel Castro', presente: false, ausente: false, justificado: false },
    { nombre: 'Javier Morales', presente: false, ausente:false , justificado:false},
    { nombre: 'Teresa Guzmán', presente:false , ausente:false , justificado:false},
    { nombre: 'José Herrera', presente:false , ausente:false , justificado:false},
    { nombre: 'Carmen Peña', presente:false , ausente:false , justificado:false},
    { nombre: 'Francisco Díaz', presente:false , ausente:false , justificado:false},
    { nombre: 'Roberto Silva', presente:false , ausente:false , justificado:false},
    { nombre: 'Gabriela Soto', presente:false , ausente:false , justificado:false},
    { nombre: 'Miguel Paredes', presente:false , ausente:false , justificado:false},
    { nombre: 'Lucía Méndez', presente:false , ausente:false , justificado:false},
    { nombre: 'Fernando Guerra', presente:false , ausente:false , justificado:false},
    { nombre: 'Daniela Ríos', presente:false , ausente:false , justificado:false},
    { nombre: 'Jorge Castillo', presente:false , ausente:false , justificado:false},
    { nombre: 'Andrea Navarro', presente:false , ausente:false , justificado:false},
    { nombre: 'Sergio Vargas', presente:false , ausente:false , justificado:false},
    { nombre: 'Cecilia Rojas', presente:false , ausente:false , justificado:false},
    { nombre: 'Raúl Torres', presente:false , ausente:false , justificado:false},
    { nombre: 'Beatriz Salinas', presente:false , ausente:false , justificado:false},
    { nombre: 'Guillermo Peña', presente:false , ausente:false , justificado:false},
    { nombre:'Patricia Mora',  presente:false , ausente:false , justificado:false},
    { nombre: 'Eduardo Luna', presente:false , ausente:false , justificado:false}
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

