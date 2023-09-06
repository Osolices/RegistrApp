import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.page.html',
  styleUrls: ['./dashboard-profesor.page.scss'],
})
export class DashboardProfesorPage implements OnInit {

  public clases = [
    {
      id:'1',
      profesor: 'Víctor Andrade',
      horario: 'lunes',
      ramo:'Calidad de software'
    },
    {
      id:'2',
      profesor: 'Andrés Polo',
      horario: 'martes',
      ramo:'Diseño y prototipos'
    },
    {
      id:'3',
      profesor: 'Jaqueline Duarte',
      horario: 'miercoles',
      ramo:'Arquitectura'
    },
    {
      id:'4',
      profesor: 'Segundo Díaz',
      horario: 'jueves',
      ramo:'Fé cristiana'
    }
  ];


  constructor(private route: Router ) { }

   menuType: string = 'push';
   
    //listar
  getClases(){
    return [...this.clases]
  }

  //filtro
  filtroLunes(clasesID: string){
    this.clases = this.clases.filter(c=> {
      return c.horario == 'lunes'

    })
  }
  

  logOut() {
    this.route.navigate(['/login']);
  }

  ngOnInit() {
    console.log(this.clases)
   
  }
 

}

