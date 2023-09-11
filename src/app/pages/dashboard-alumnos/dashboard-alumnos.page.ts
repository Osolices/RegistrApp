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
      title: 'Card 1',
      subtitle: 'Subtitle 1',
      extraInfo: 'Extra info 1'
    },
    // ... más tarjetas aquí
  ];
  constructor(private route: Router) { }

  menuType: string = 'push';

  logOut() {
    this.route.navigate(['/login']);
  }

  ngOnInit() {
  }

}
