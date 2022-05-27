import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor( private http: HttpClient ) { }

  /**
   * Obtiene todas las facturas asociadas a un vehiculo
   * @param idVehicle: number
   */
  getInvoicesByVehicle( idVehicle: number ) {
    return this.http.get(`${ URL }facturas/${ idVehicle }`);
  }

  /**
   * Obtiene una factura específica por el id
   * @param idInvoice: string
   */
  getInvoiceById( idInvoice: string ) {
    return this.http.get(`${ URL }factura/${ idInvoice }`);
  }
}
