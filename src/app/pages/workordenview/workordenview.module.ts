import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WorkordenviewPageRoutingModule } from './workordenview-routing.module';
import { WorkordenviewPage } from './workordenview.page';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkordenviewPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WorkordenviewPage]
})
export class WorkordenviewPageModule {}
