import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Clases } from 'src/app/interfaces/clases';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

    menuType: string = 'push';

    ramo: string='';
    selectedRow: any = { estado: false };

  logOut() {
    this.router.navigate(['/login']);
  }
  ngOnInit() {
  }

}
