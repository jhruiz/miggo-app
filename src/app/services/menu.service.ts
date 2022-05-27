import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componentmenu } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor( private http: HttpClient ) { }

  stateShowMenu = false;

  /**
   * Obtiene las opciones de menu del archivo json local
   */
  getMenuOptions() {
    return this.http.get<Componentmenu[]>('/assets/data/menu.json');
  }

  /** Setea la variable que indica si el menu es visible o no */
  setShowMenu(state: boolean) {
    this.stateShowMenu = state;
  }

  /** Retorna la variable que indica si el menu es visible o no */
  getShowMenu() {
    return this.stateShowMenu;
  }
}
