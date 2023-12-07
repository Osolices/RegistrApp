import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './../../../auth-service.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit, OnDestroy {
  nombre: string = '';
  fecha: string = '';
  descripcion: string = '';
  id_seccion: number = 0;
  nro_clase: number=0;
  id_clase: number=0;
  intervalId: number = 0;
  time: number = 0;
  qrData: string = '';
  qrUrl: string='';
  estudiantes: any[] = [];
  presentes: any[] =[];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthServiceService,
    private cd: ChangeDetectorRef
  ) {}

  ramo: string = '';
  selectedRow: any = { estado: false };

  ngAfterViewInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false,
      });
    }
  }
  logOut() {
    this.authService.logout(); // Llama al método logout de AuthServiceService aquí
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params); // Imprime todos los parámetros de la ruta
      this.startTimer();
      this.descripcion = params['descripcion'];
      this.nombre = params['nombre'];
      this.id_seccion = params['id_seccion'];
      this.fecha= params['fecha'];
      this.nro_clase= params['nro_clase'];
      this.id_clase= params['id_clase'];
      this.generarQr(this.descripcion, this.nombre, this.id_seccion, this.fecha, this.nro_clase, this.id_clase);
      this.obtenerEstudiantes(this.id_seccion); 
    });
  }
  ngOnDestroy() {
    this.pauseTimer();
  }

  startTimer() {
    this.intervalId = window.setInterval(() => {
      this.time++;
      console.log(this.time);
    }, 1000);
  }
  pauseTimer() {
    window.clearInterval(this.intervalId);
  }
  ubicacionActual(){
    return new Promise<{lat: number, lon: number}>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        }, (error) => {
          reject('Error al obtener la ubicación');
        });
      } else {
        reject('Geolocalización no es soportada por este navegador');
      }
    });
  };
  
  async generarQr(descripcion: string, nombre: string, id_seccion: number, fecha: string, nro_clase: number, id_clase:number) {
    try {
      const coords = await this.ubicacionActual();
      let qrData = {
        descripcion: descripcion,
        nombre: nombre,
        id_seccion: id_seccion,
        fecha: fecha,
        nro_clase: nro_clase,
        id_clase: id_clase,
        latitud: coords.lat,
        longitud: coords.lon
      };
      this.qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(JSON.stringify(qrData))}`;
    } catch (error) {
      console.log(error);
    }
  }

  obtenerEstudiantes(id_seccion: number,) {
    console.log(id_seccion);
    this.http
      .get(`https://osolices.pythonanywhere.com/alumno_seccion/`)
      .subscribe((dataAlumnos: any) => {
        console.log(dataAlumnos);
        if (dataAlumnos) {
          const estudiantesSeccion: any[] = [];
          dataAlumnos.forEach((alumno: any) => {
            if (Number(alumno.id_seccion) === Number(id_seccion)) {
              estudiantesSeccion.push(alumno);
            }
          });
          console.log(estudiantesSeccion);
          this.estudiantes = estudiantesSeccion; // Asigna el array estudiantesSeccion a la propiedad estudiantes de la clase
          this.cd.detectChanges(); // Llama al método detectChanges() para actualizar la vista
        }
      });
  }
  
  llenarTabla(){

  }
}
