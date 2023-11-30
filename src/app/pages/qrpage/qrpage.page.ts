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
  
  ubicacionActual(){
    return new Promise<{lat: number, lon: number}>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        }, (error) => {
          reject('Error al obtener la ubicación');
        });
      } else {
        reject('Geolocalización no es soportada por este navegador');
      }
    });
  };
  ngOnInit() {
  }
  

}