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
    { nombre: 'Juan Andrade' },
    { nombre: 'María González' },
    { nombre: 'Carlos Pérez' },
    { nombre: 'Ana Martínez' },
    { nombre: 'Luis Rodríguez' },
    { nombre: 'Sofía García' },
    { nombre: 'Antonio López' },
    { nombre: 'Patricia Torres' },
    { nombre: 'Ricardo Ramírez' },
    { nombre: 'Isabel Castro' },
    { nombre: 'Javier Morales' },
    { nombre: 'Teresa Guzmán' },
    { nombre: 'José Herrera' },
    { nombre: 'Carmen Peña' },
    { nombre: 'Francisco Díaz' },
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
  irDash() {
    this.router.navigateByUrl('/dashboard-profesor/asistencia', {
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

  generarQr(descripcion: string, nombre: string, id_seccion: number, salaId: number, fecha: string) {
    let qrData = {
      descripcion: descripcion,
      nombre: nombre,
      id_seccion: id_seccion,
      salaId: salaId,
      fecha: fecha
    };
    this.qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(JSON.stringify(qrData))}`;
  }
  

}
