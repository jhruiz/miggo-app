import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'qrscan',
    loadChildren: () => import('./pages/qrscan/qrscan.module').then( m => m.QrscanPageModule)
  },
  {
    path: 'invoiceindex',
    loadChildren: () => import('./pages/invoiceindex/invoiceindex.module').then( m => m.InvoiceindexPageModule)
  },
  {
    path: 'invoiceview/:id',
    loadChildren: () => import('./pages/invoiceview/invoiceview.module').then( m => m.InvoiceviewPageModule)
  },
  {
    path: 'workordenindex',
    loadChildren: () => import('./pages/workordenindex/workordenindex.module').then( m => m.WorkordenindexPageModule)
  },
  {
    path: 'workordenview/:id',
    loadChildren: () => import('./pages/workordenview/workordenview.module').then( m => m.WorkordenviewPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'info-vehicle',
    loadChildren: () => import('./pages/info-vehicle/info-vehicle.module').then( m => m.InfoVehiclePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
