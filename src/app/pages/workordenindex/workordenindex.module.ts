import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { WorkordenindexPageRoutingModule } from './workordenindex-routing.module';
import { WorkordenindexPage } from './workordenindex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkordenindexPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WorkordenindexPage]
})
export class WorkordenindexPageModule {}
