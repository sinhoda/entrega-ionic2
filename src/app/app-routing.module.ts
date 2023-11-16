import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PermitidoGuard } from './guard/permitido.guard';
import { NoPermitidoGuard } from './guard/no-permitido.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro-usuario',
    redirectTo: 'registro-usuario',
    pathMatch: 'full'
  },
  {
    path: 'scanner-qr',
    redirectTo: 'scanner-qr',
    pathMatch: 'full'
  },
  {
    path: 'registrar-clase',
    redirectTo: 'registrar-clase',
    pathMatch: 'full'
  },
  {
    path: 'recuperar-cuenta',
    redirectTo: 'recuperar-cuenta',
    pathMatch: 'full'
  },
  
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'e404',
    loadChildren: () => import('./e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule),
    canActivate: [NoPermitidoGuard]
  },
  {
    path: 'scanner-qr',
    loadChildren: () => import('./scanner-qr/scanner-qr.module').then( m => m.ScannerQRPageModule),
    canActivate: [PermitidoGuard]
    
  },
  {
    path: 'registrar-clase',
    loadChildren: () => import('./registrar-clase/registrar-clase.module').then( m => m.RegistrarClasePageModule),
    canActivate: [PermitidoGuard]
  },
  {
    path: 'recuperar-cuenta',
    loadChildren: () => import('./recuperar-cuenta/recuperar-cuenta.module').then( m => m.RecuperarCuentaPageModule),
    canActivate: [NoPermitidoGuard]
    
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
