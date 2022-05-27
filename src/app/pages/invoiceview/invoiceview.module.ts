import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InvoiceviewPageRoutingModule } from './invoiceview-routing.module';
import { InvoiceviewPage } from './invoiceview.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceviewPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InvoiceviewPage]
})
export class InvoiceviewPageModule {}
