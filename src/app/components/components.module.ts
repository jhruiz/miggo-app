import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MiggofabComponent } from './miggofab/miggofab.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    MenuComponent,
    MiggofabComponent,
    HeaderComponent
  ],
  exports: [
    MenuComponent,
    MiggofabComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
