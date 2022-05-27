import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Componentmenu } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  componentes: Observable<Componentmenu[]>;

  constructor( private menuServ: MenuService ) { }

  ngOnInit() {
    this.componentes = this.menuServ.getMenuOptions();
  }

}
