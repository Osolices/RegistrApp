import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Clases } from 'src/app/interfaces/clases';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-detalleramo',
  templateUrl: './detalleramo.page.html',
  styleUrls: ['./detalleramo.page.scss'],
})
export class DetalleramoPage implements OnInit {
  
  ramo: string='';
  selectedRow: any = { estado: false };
  
  clases: Clases[] = [
    {
      id: 1,
      fecha: "21/09/2023",
      estado: true
    },
    {
      id: 2,
      fecha: "28/09/2023",
      estado: true
    },
    {
      id: 3,
      fecha: "05/10/2023",
      estado: true
    },
    {
      id: 4,
      fecha: "12/10/2023",
      estado: true
    },
    {
      id: 5,
      fecha: "19/10/2023",
      estado: true
    },
    {
      id: 6,
      fecha: "26/10/2023",
      estado: false
    }
  ];

  constructor(private route: ActivatedRoute,
              private router: Router) { }
   
  

  logOut() {
    this.router.navigate(['/login']);
  }

  IrAqr(){
    this.router.navigate(['dashboard-profesor/qr']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);  // Imprime todos los parámetros de la ruta
      this.ramo = params['ramo'];
    });
  }
  selectRow(clase : any) {
    this.selectedRow = clase;
    console.log(clase); // Aquí puedes manejar la fila seleccionada
  }
  ngAfterViewInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false
      });
    }
  }

}
