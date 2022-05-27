import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkordenindexPage } from './workordenindex.page';

const routes: Routes = [
  {
    path: '',
    component: WorkordenindexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkordenindexPageRoutingModule {}
