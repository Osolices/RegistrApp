import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSegment } from '@ionic/angular';


@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.page.html',
  styleUrls: ['./dashboard-profesor.page.scss'],
})
export class DashboardProfesorPage implements OnInit {
  
  selectedDay: string = 'todos';
  
  public clases = [
    {
      id:'1',
      profesor: 'Víctor Andrade',
      horario: 'lunes',
      ramo:'Calidad de software'
    },
    {
      id:'2',
      profesor: 'Víctor Andrade',
      horario: 'martes',
      ramo:'Diseño y prototipos'
    },
    {
      id:'3',
      profesor: 'Víctor Andrade',
      horario: 'miercoles',
      ramo:'Arquitectura'
    },
    {
      id:'4',
      profesor: 'Víctor Andrade',
      horario: 'martes',
      ramo:'Base de Datos'
    }
  ];


  constructor(private route: Router) { }

   menuType: string = 'push';
   

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

