import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogueadoGuard } from './guards/logueado.guard';

const routes: Routes = [
 
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[LogueadoGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) 

  }, 
  {
    path: 'cosaslindas',
    loadChildren: () => import('./cosaslindas/cosaslindas.module').then( m => m.CosaslindasPageModule)
  },
  {
    path: 'cosasfeas',
    loadChildren: () => import('./cosasfeas/cosasfeas.module').then( m => m.CosasfeasPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./subir-foto/subir-foto.module').then( m => m.SubirFotoPageModule)
  },
  {
    path: 'misfotos',
    loadChildren: () => import('./misfotos/misfotos.module').then( m => m.MisfotosPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
