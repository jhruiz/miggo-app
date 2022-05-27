import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  objVehicle: any;

  constructor( private http: HttpClient ) { }

  /**
   * Obtiene la informacion de un vehiculo por su placa
   */
  getVehicleByLicensePlate( licensePlate: string ) {
    return this.http.get(`${ URL }vehiculos/${ licensePlate }`);
  }

  /**
   * Setea un objeto con la informacion del vehiculo obtenido
   */
  setDataVehicle( vehicle: any ) {

    if ( vehicle.length > 0 ) {

      this.objVehicle = {
        idVehiculo: vehicle['0'].id,
        placa: vehicle['0'].placa,
        cilindraje: vehicle['0'].cilindraje,
        color: vehicle['0'].color,
        marca: vehicle['0'].descripcion,
        linea: vehicle['0'].linea,
        modelo: vehicle['0'].modelo,
        soat: vehicle['0'].soat,
        tecno: vehicle['0'].tecno
      };

    } else {
      this.objVehicle = null;
    }
  }

  /**
   * Retorna un objeto con la información del vehículo obtenido
   */
  getDataVehicle() {
    return this.objVehicle;
  }
}
