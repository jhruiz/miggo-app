import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponentSocialMedia } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SocialmediaService {

  constructor( private http: HttpClient ) { }

  /**
   * Obtiene las redes sociales de la empresa
   */
  getSocialMedia() {
    return this.http.get<ComponentSocialMedia[]>('/assets/data/socialmedia.json');
  }
}
