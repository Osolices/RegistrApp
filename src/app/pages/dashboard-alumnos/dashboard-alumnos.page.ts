import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cursos } from 'src/app/interfaces/cursos';



@Component({
  selector: 'app-dashboard-alumnos',
  templateUrl: './dashboard-alumnos.page.html',
  styleUrls: ['./dashboard-alumnos.page.scss'],
})


export class DashboardAlumnosPage implements OnInit {

  cursos: Cursos[] = [
    {
      title: "Arquitectura",
      porcentaje: 60,
      asistencia1: "20/09/2023",
      asistencia2: "14/09/2023",
      expanded: false,
      color: "green"
    },
    {
      title: "Programacion Movil",
      porcentaje: 70, // Ajusta estos valores según tus necesidades
      asistencia1: "21/09/2023",
      asistencia2: "15/09/2023",
      expanded: false,
      color: "blue"
    },
    {
      title: "Calidad de Software",
      porcentaje: 80, // Ajusta estos valores según tus necesidades
      asistencia1: "22/09/2023",
      asistencia2: "16/09/2023",
      expanded: false,
      color: "red"
    },
    // ... puedes agregar más cursos aquí
  ];
  
  constructor(private route: Router) { }

  menuType: string = 'push';

  logOut() {
    this.route.navigate(['/login']);
  }

  ngOnInit() {
  }

}
