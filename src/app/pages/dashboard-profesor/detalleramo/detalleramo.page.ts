import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalleramo',
  templateUrl: './detalleramo.page.html',
  styleUrls: ['./detalleramo.page.scss'],
})
export class DetalleramoPage implements OnInit {
  


  public Alumnos=[
    {
      id:'200045009',
      nombre: 'Camila',
      apellido:'Rumino'
    },
    {
      id:'199029812',
      nombre: 'Guillermo',
      apellido:'Lourdes'
    },
    {
      id:'200045009',
      nombre: 'Camila',
      apellido:'Rumino'
    },
    {
      id:'200045009',
      nombre: 'Camila',
      apellido:'Rumino'
    },
    {
      id:'200045009',
      nombre: 'Camila',
      apellido:'Rumino'
    },
    {
      id:'200045009',
      nombre: 'Camila',
      apellido:'Rumino'
    },
    {
      id:'200045009',
      nombre: 'Camila',
      apellido:'Rumino'
    },
    {
      id:'200045009',
      nombre: 'Camila',
      apellido:'Rumino'
    }
  ]

  constructor( ) { }

   

  ngOnInit() {
    console.log(this.Alumnos)
  }

}
