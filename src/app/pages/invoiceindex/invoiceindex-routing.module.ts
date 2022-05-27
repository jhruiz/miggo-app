import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceindexPage } from './invoiceindex.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceindexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceindexPageRoutingModule {}
