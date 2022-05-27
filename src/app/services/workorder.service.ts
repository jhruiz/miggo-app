import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ComponenteOrdenTrabajo } from '../interfaces/interfaces';

const URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WorkorderService {

  constructor( private http: HttpClient ) { }

  /**
   * Obtiene todas las ordenes de trabajo asociadas a un vehiculo
   * @param idVehicle: number
   */
  getWorkOrdersByVehicle( idVehicle: number ) {
    return this.http.get<ComponenteOrdenTrabajo[]>(`${ URL }ordentrabajos/${ idVehicle }`);
  }

  /**
   * Obtiene una orden de trabajo específica por el id
   * @param idInvoice: string
   */
  getWorkOrderById( idInvoice: string ) {
    return this.http.get(`${ URL }ordentrabajo/${ idInvoice }`);
  }
}
