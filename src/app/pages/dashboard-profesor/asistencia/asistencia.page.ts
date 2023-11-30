import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  estudiantes = history.state.estudiantes;
  fecha: string = '';
  id_seccion: number = 0;

  public estudiantes2 = [
    { rut: '0123456789', nombre: 'Ricardo Silva', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '0901234568', nombre: 'Jorge Perez', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '1012345678', nombre: 'Veronica Rios', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '1012345679', nombre: 'Sandra Gomez', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '1123456789', nombre: 'Pablo Herrera', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '2123456789', nombre: 'Mauricio Figueroa', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '2123456790', nombre: 'Roberto Rodriguez', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '2234567890', nombre: 'Daniela Torres', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '3234567890', nombre: 'Carolina Vasquez', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '3234567901', nombre: 'Susana Vargas', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '3345678901', nombre: 'Javier Jara', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '4345678901', nombre: 'Felipe Espinoza', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '4345679012', nombre: 'Ricardo Herrera', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '4456789012', nombre: 'Gabriel Castillo', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '5456789012', nombre: 'Claudia Contreras', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '5456789123', nombre: 'Cecilia Morales', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '5567890123', nombre: 'Carmen Vidal', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '6567890123', nombre: 'Guillermo Medina', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '6567891234', nombre: 'Hernan Rios', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '6678901234', nombre: 'Rodrigo Navarro', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '6789012345', nombre: 'Carlos Morales', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '7678901234', nombre: 'Paula Hernandez', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '7789012345', nombre: 'Monica Alvarez', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '7890123456', nombre: 'Patricia Vargas', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '8789012346', nombre: 'Eduardo Torres', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '8890123456', nombre: 'Hector Tapia', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '8901234567', nombre: 'Luis Rojas', presente: false, ausente: false, justificado: false, asistencia: 75 },
    { rut: '9012345678', nombre: 'Fernanda Muñoz', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '9890123457', nombre: 'Isabel Lopez', presente: false, ausente: false, justificado: false, asistencia: 60 },
    { rut: '9901234567', nombre: 'Sergio Paredes', presente: false, ausente: false, justificado: false, asistencia: 60 }
];


  
  constructor(private toastController: ToastController, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngAfterViewInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false
      });
    }
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params); // Imprime todos los parámetros de la ruta
      this.id_seccion = params['id_seccion'];
      this.fecha= params['fecha'];
    });

    this.estudiantes2.forEach(e => {
      e.presente = false;
      e.ausente = true; // inicialmente marca a todos como ausentes
      e.justificado = false;
    });
    if (this.estudiantes) { // Asegúrate de que this.estudiantes no sea undefined
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
  }

  logOut() {
    this.router.navigate(['/login']);
  }

  
  async alerta() {
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
  registrarAsistencia() {
    const fecha = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
  
    this.estudiantes2.forEach(estudiante => {
      // Comprueba si el estudiante también está en 'estudiantes'
      const estaPresente = this.estudiantes.some((e: any) => e.nombre === estudiante.nombre);
  
      // Si el estudiante está presente, registra como 'Presente', de lo contrario registra como 'Ausente'
      const estado = estaPresente ? 'Presente' : 'Ausente';
  
      const asistencia = {
        fecha: fecha,
        estado: estado,
        rut_alumno: `https://osolices.pythonanywhere.com/alumnos/${estudiante.rut}/`,
        id_seccion: `https://osolices.pythonanywhere.com/secciones/${this.id_seccion}/`
      };
  
      this.http.post('https://osolices.pythonanywhere.com/asistencias/', asistencia)
        .subscribe(response => {
          console.log(response);
        }, error => {
          console.error(error);
        });
    });
    this.alerta();
  }
  
  

}

