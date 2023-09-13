import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardProfesorPage } from './dashboard-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardProfesorPage
  },
  
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'qr/:ramo',
    loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'detalleramo/:ramo',
    loadChildren: () => import('./detalleramo/detalleramo.module').then( m => m.DetalleramoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardProfesorPageRoutingModule {}
