import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard-alumnos',
    loadChildren: () => import('./pages/dashboard-alumnos/dashboard-alumnos.module').then( m => m.DashboardAlumnosPageModule)
  },
  {
    path: 'dashboard-profesor',
    loadChildren: () => import('./pages/dashboard-profesor/dashboard-profesor.module').then( m => m.DashboardProfesorPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },

  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
