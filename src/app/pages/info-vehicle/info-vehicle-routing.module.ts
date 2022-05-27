import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoVehiclePage } from './info-vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: InfoVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoVehiclePageRoutingModule {}
