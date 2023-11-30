import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cursos } from 'src/app/interfaces/cursos';
import * as bootstrap from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './../../auth-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-alumnos',
  templateUrl: './dashboard-alumnos.page.html',
  styleUrls: ['./dashboard-alumnos.page.scss'],
})
export class DashboardAlumnosPage implements OnInit {
  secciones: any[] = [];
  

  constructor(private router: Router, private http: HttpClient,private authService: AuthServiceService) {}

  getAsignaturasEstudiante() {
    const userData = window.localStorage.getItem('userData');
  
    if (userData) {
      const rut = JSON.parse(userData).rut_alumno;
  
      this.http
        .get(`https://osolices.pythonanywhere.com/alumno_seccion/?rut=${rut}`)
        .subscribe((data: any) => {
          if (data) {
            data.forEach(
              (item: { id_seccion: number; id_asignatura: string }) => {
                const seccion = item.id_seccion;
  
                console.log(seccion);
  
                this.http
                  .get(
                    `https://osolices.pythonanywhere.com/secciones/${seccion}`
                  )
                  .subscribe((seccionData: any) => {
                    const asignatura = seccionData.id_asignatura;
                    const seccionObj = {...seccionData}; // Crea un nuevo objeto para cada sección
                    this.secciones.push(seccionObj);
                    console.log(seccionObj);
  
                    const asignaturaId = asignatura.split('/').slice(-2, -1)[0]; // Extrae el ID de la asignatura de la URL
  
                    this.http
                      .get(
                        `https://osolices.pythonanywhere.com/asignaturas/${asignaturaId}`
                      )
                      .subscribe((asignaturaData: any) => {
                        const nombre = asignaturaData.nombre;
                        const color = asignaturaData.color;
                        console.log(color);
                        seccionObj.nombre = nombre;
                        seccionObj.color = color.toLowerCase(); // Almacena el color en el objeto de sección
                        console.log(seccionObj);
  
                        this.http
                          .get(
                            `https://osolices.pythonanywhere.com/asistencias/?rut=${rut}&seccion=${seccion}`
                          )
                          .subscribe((asistenciasData: Object) => {
                            // Ordena las asistencias por fecha en orden descendente
                            const asistenciasOrdenadas = Object.values(
                              asistenciasData
                            ).sort(
                              (a: any, b: any) =>
                                new Date(b.fecha).getTime() -
                                new Date(a.fecha).getTime()
                            );
  
                            // Obtiene las dos fechas más recientes
                            seccionObj.date1 = asistenciasOrdenadas[0]?.fecha;
                            seccionObj.date2 = asistenciasOrdenadas[1]?.fecha;
                          });
                      });
                  });
              }
            );
          }
        });
    }
  }
  
  logOut() {
    this.authService.logout(); // Llama al método logout de AuthServiceService aquí
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false,
      });
    }
    this.getAsignaturasEstudiante();

  }

  irQR() {
    this.router.navigate(['/qrpage']);
  }

  
}
