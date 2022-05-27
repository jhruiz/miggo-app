import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkordenviewPage } from './workordenview.page';

const routes: Routes = [
  {
    path: '',
    component: WorkordenviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkordenviewPageRoutingModule {}
