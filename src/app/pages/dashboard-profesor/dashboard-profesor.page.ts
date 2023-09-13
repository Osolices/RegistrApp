import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSegment } from '@ionic/angular';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.page.html',
  styleUrls: ['./dashboard-profesor.page.scss'],
})
export class DashboardProfesorPage implements OnInit {
  
  selectedDay: string = 'todos';
  profesor: string = 'Victor Falso';
  
  public clases = [
    {
      profesor: 'Víctor Andrade',
      dias: 'lunes',
      bloque: '8:30-9:40',
      ramo:'Calidad de software',
      seccion:'005D'
    },
    {
      profesor: 'Víctor Andrade',
      dias: 'martes',
      bloque: '8:30-9:40',
      ramo:'Diseño y prototipos',
      seccion:'001D'
    },
    {
      profesor: 'Víctor Andrade',
      dias: 'miercoles',
      bloque: '10:40-12:50',
      ramo:'Arquitectura',
      seccion:'004D'
    },
    {
      profesor: 'Víctor Andrade',
      dias: 'martes',
      bloque: '10:00-12:50',
      ramo:'Base de Datos',
      seccion:'004D'
    },
    {
      profesor: 'Víctor Andrade',
      dias: 'lunes',
      bloque: '10:00-12:50',
      ramo:'Calidad de software',
      seccion:'007D'
    },
    {
      profesor: 'Víctor Andrade',
      dias:'miercoles',
      bloque: '11:30-12:50',
      ramo:'Arquitectura',
      seccion:'005D'
    },
    {
      profesor: 'Víctor Andrade',
      dias: 'jueves',
      bloque: '8:30-11:20',
      ramo:'Arquitectura',
      seccion:'006D'
    },
    {
      profesor: 'Víctor Andrade',
      dias: 'viernes',
      bloque: '10:00-12:50',
      ramo:'Base de Datos',
      seccion:'004D'
    },
    {
      profesor: 'Víctor Andrade',
      dias: 'jueves',
      bloque: '13:00-14:20',
      ramo:'Calidad de software',
      seccion:'005D'
    }
  ];


  constructor(private route: Router) { }

  ngAfterViewInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false
      });
    }
  }

  logOut() {
    this.route.navigate(['/login']);
  }

  ngOnInit() {
    console.log(this.clases)
  }
  updateDay(event: any) {
    this.selectedDay = event.detail.value;
  }

}

