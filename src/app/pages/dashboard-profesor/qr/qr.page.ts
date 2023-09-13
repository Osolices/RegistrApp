import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Clases } from 'src/app/interfaces/clases';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit, OnDestroy {
  
  intervalId: number=0;
  time: number = 0;

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
    { nombre: 'Francisco Díaz' }
  ];
  

  constructor(private route: ActivatedRoute,
    private router: Router) { }

    

    ramo: string='';
    selectedRow: any = { estado: false };

    ngAfterViewInit() {
      let element = document.getElementById('navbarToggleExternalContent');
      if (element) {
        let bsCollapse = new bootstrap.Collapse(element, {
          toggle: false
        });
      }
    }
  logOut() {
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);  // Imprime todos los parámetros de la ruta
      this.ramo = params['ramo'];
      this.startTimer();
    });
  }
  ngOnDestroy() {
    this.pauseTimer();
  }
  irDash() {
    this.router.navigateByUrl('/dashboard-profesor/asistencia', { state: { estudiantes: this.estudiantes } });
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

}
