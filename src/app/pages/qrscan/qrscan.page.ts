import { Component } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage {

  licensePlate = '';

  constructor(  private vehicleServ: VehicleService,
                private alertServ: AlertService,
                private router: Router,
                private barcodeScanner: BarcodeScanner ) { }

  ionViewWillEnter() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.licensePlate = barcodeData.text;
      this.getInfoVehicleByLicensePlate();
     }).catch(err => {
      this.alertServ.catchError();
     });
  }

  /**
   * Obtiene la información del vehículo
   */
  getInfoVehicleByLicensePlate() {
    this.vehicleServ.getVehicleByLicensePlate( this.licensePlate )
        .subscribe( (resp: any) => {
          if ( resp.estado ) {

            /** Setea la informacion del vehiculo */
            this.vehicleServ.setDataVehicle( resp.data );

            this.router.navigate( ['home'] );
          } else {
            this.alertServ.getSimpleAlert('ALERTA!!', '', resp.mensaje, ['OK']);
          }
        }, (error: any) => {
          this.alertServ.catchError();
        });

  }

}
