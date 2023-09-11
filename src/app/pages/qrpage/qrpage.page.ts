import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrpage',
  templateUrl: './qrpage.page.html',
  styleUrls: ['./qrpage.page.scss'],
})
export class QrpagePage implements OnInit {

  constructor(private router: Router) { }

  goToDash() {
    setTimeout(() => {
      this.router.navigate(['/dashboard-alumnos'])
    }, 3000);
  }

  ngOnInit() {
  }

}