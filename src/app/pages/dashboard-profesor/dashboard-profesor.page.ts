import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.page.html',
  styleUrls: ['./dashboard-profesor.page.scss'],
})
export class DashboardProfesorPage implements OnInit {


  public clases = [
    {
      id:'1',
      ramo:'Calidad de software'
    },
    {
      id:'2',
      ramo:'Diseño y prototipos'
    },
    {
      id:'3',
      ramo:'Arquitectura'
    },
    {
      id:'4',
      ramo:'Fé cristiana'
    },
  ];
  constructor() { }

  ngOnInit() {
    console.log(this.clases)
  }

}
