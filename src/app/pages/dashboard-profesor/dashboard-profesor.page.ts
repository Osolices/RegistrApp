import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSegment } from '@ionic/angular';
import * as bootstrap from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './../../auth-service.service';

@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.page.html',
  styleUrls: ['./dashboard-profesor.page.scss'],
})
export class DashboardProfesorPage implements OnInit {
  selectedDay: string = 'todos';
  secciones: any[] = [];
  usuario: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  ngAfterViewInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false,
      });
    }
  }

  getAsignaturasProfesor() {
    const userData = window.localStorage.getItem('userData');

    if (userData) {
      const rut = JSON.parse(userData).rut_profesor;
      console.log(rut);
      this.http
        .get(`https://osolices.pythonanywhere.com/profesores/`)
        .subscribe((data: any) => {
          console.log(data);
          if (data) {
            // Filtrar los datos para obtener solo el profesor con el rut especificado
            const profesorData = data.filter(
              (profesor: any) => profesor.rut_profesor === rut
            );
            console.log(profesorData);

            this.http
              .get(`https://osolices.pythonanywhere.com/secciones/`)
              .subscribe((secciones: any) => {
                const seccionesProfesor = secciones.filter(
                  (seccion: any) =>
                    seccion.rut_profesor ===
                    `https://osolices.pythonanywhere.com/profesores/${rut}/`
                );
                console.log(seccionesProfesor);

                seccionesProfesor.forEach((seccion: any) => {
                  const asignatura = seccion.id_asignatura;
                  console.log('asignatura:', asignatura);

                  const asignaturaId = asignatura.split('/').slice(-2, -1)[0]; // Extrae el ID de la asignatura de la URL
                  console.log('asignaturaId:', asignaturaId);

                  this.http
                    .get(
                      `https://osolices.pythonanywhere.com/asignaturas/${asignaturaId}`
                    )
                    .subscribe((asignaturaData: any) => {
                      const nombre = asignaturaData.nombre;
                      const color = asignaturaData.color;
                      console.log('color:', color);

                      // Añade el nombre y el color a la sección
                      seccion.nombre = nombre;
                      seccion.color = color.toLowerCase();

                      // Añade la sección al array secciones
                      this.secciones.push(seccion);

                      // Extrae el ID de la sala de la URL
                      const sala = seccion.id_sala;
                      const salaId = sala.split('/').slice(-2, -1)[0];
                      console.log('salaId:', salaId);

                      // Añade el ID de la sala a la sección
                      seccion.salaId = salaId;
                      console.log('seccion:', seccion);
                    });
                });
              });
          }
        });
    }
  }

  logOut() {
    this.authService.logout(); // Llama al método logout de AuthServiceService aquí
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.getAsignaturasProfesor();
    const userData = window.localStorage.getItem('userData');
    if (userData) {
      this.usuario = JSON.parse(userData);
    }
  }
  updateDay(event: any) {
    this.selectedDay = event.detail.value;
  }
}
