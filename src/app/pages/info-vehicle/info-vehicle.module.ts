import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoVehiclePageRoutingModule } from './info-vehicle-routing.module';

import { InfoVehiclePage } from './info-vehicle.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoVehiclePageRoutingModule,
    ComponentsModule
  ],
  declarations: [InfoVehiclePage]
})
export class InfoVehiclePageModule {}
