import { Component, OnInit } from '@angular/core';
import { ComponentSocialMedia } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { SocialmediaService } from '../../services/socialmedia.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-miggofab',
  templateUrl: './miggofab.component.html',
  styleUrls: ['./miggofab.component.scss'],
})
export class MiggofabComponent implements OnInit {

  componentes: Observable<ComponentSocialMedia[]>;

  constructor(  private socialmediaServ: SocialmediaService ) { }

  ngOnInit() {
    // Obtiene las redes sociales asociadas a la empresa
    this.componentes = this.socialmediaServ.getSocialMedia();
  }

  /**
   * Abre la red social seleccionada
   * @param link: string
   * @param system: string
   * @param location: string
   */
  openSocialMedia(link: string, system: string, location: string) {
    window.open(link, system, location);
  }
}
