import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-alumnos',
  templateUrl: './dashboard-alumnos.page.html',
  styleUrls: ['./dashboard-alumnos.page.scss'],
})
export class DashboardAlumnosPage implements OnInit {

  constructor(private route: Router) { }

  menuType: string = 'push';

  logOut() {
    this.route.navigate(['/login']);
  }

  ngOnInit() {
  }

}
