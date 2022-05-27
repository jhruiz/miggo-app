import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { Componentmenu } from 'src/app/interfaces/interfaces';
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  componentes: Observable<Componentmenu[]>;

  constructor(  private menuServ: MenuService,
                private router: Router ) {}

  ngOnInit() {

    this.componentes = this.menuServ.getMenuOptions();

  }

  /**
   * Redirecciona al módulo seleccionado
   */
  redirectTo( redirectTo: string ) {
    this.router.navigate( [redirectTo] );
  }

  /**
   * Salir de la aplicación
   */
  logout() {
    this.router.navigate( ['login'] );
  }

}
