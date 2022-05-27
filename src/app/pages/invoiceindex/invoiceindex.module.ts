import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InvoiceindexPageRoutingModule } from './invoiceindex-routing.module';
import { InvoiceindexPage } from './invoiceindex.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceindexPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InvoiceindexPage]
})
export class InvoiceindexPageModule {}
