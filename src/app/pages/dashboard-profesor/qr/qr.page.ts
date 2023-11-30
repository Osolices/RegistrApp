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
  salaId: number = 0;
  fecha: string = '';
  descripcion: string = '';
  id_seccion: number = 0;
  intervalId: number = 0;
  time: number = 0;
  qrData: string = '';
  qrUrl: string='';

  public estudiantes = [
    { rut: '0123456789', nombre: 'Ricardo Silva' },
    { rut: '0901234568', nombre: 'Jorge Perez' },
    { rut: '1012345678', nombre: 'Veronica Rios' },
    { rut: '1012345679', nombre: 'Sandra Gomez' },
    { rut: '1123456789', nombre: 'Pablo Herrera' },
    { rut: '2123456789', nombre: 'Mauricio Figueroa' },
    { rut: '2123456790', nombre: 'Roberto Rodriguez' },
    { rut: '2234567890', nombre: 'Daniela Torres' },
    { rut: '3234567890', nombre: 'Carolina Vasquez' },
    { rut: '3234567901', nombre: 'Susana Vargas' },
    { rut: '3345678901', nombre: 'Javier Jara' },
    { rut: '4345678901', nombre: 'Felipe Espinoza' },
    { rut: '4345679012', nombre: 'Ricardo Herrera' },
    { rut: '4456789012', nombre: 'Gabriel Castillo' },
    { rut: '5456789012', nombre: 'Claudia Contreras' }
];


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
      this.salaId = params['salaId'];
      this.fecha= params['fecha'];
      this.generarQr(this.descripcion, this.nombre, this.id_seccion, this.salaId, this.fecha);
    });
  }
  ngOnDestroy() {
    this.pauseTimer();
  }
  irDash(fecha: string, id_seccion: number) {
    this.router.navigateByUrl(`/dashboard-profesor/asistencia/${fecha}/${id_seccion}`, {
      state: { estudiantes: this.estudiantes },
    });
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
  
  async generarQr(descripcion: string, nombre: string, id_seccion: number, salaId: number, fecha: string) {
    try {
      const coords = await this.ubicacionActual();
      let qrData = {
        descripcion: descripcion,
        nombre: nombre,
        id_seccion: id_seccion,
        salaId: salaId,
        fecha: fecha,
        latitud: coords.lat,
        longitud: coords.lon
      };
      this.qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(JSON.stringify(qrData))}`;
    } catch (error) {
      console.log(error);
    }
  }
}
