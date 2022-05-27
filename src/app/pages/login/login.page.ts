import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('licensePlate', {static: false}) licensePlate: any;
  slideOptHeaderOpt: any = {};
  slideOptFooterOpt: any = {};
  slideImgHeader: any = [];
  slideImgFooter: any = [];
  empId = 27;
  url = 'https://torque.miggo.com.co/imagenesCloud/imgPublicidad/27/';

  constructor(  private vehicleServ: VehicleService,
                private alertServ: AlertService,
                private router: Router,
                private loginService: LoginService ) { }

  ngOnInit() {

    this.licensePlate = '';

    this.slideHeader();
    this.slideFooter();

    this.slideHeaderOpt();
    this.slideFooterOpt();

  }

  /**
   * Valida si se ingreso la placa y gestiona el llamado a la funcion que obtiene 
   * la informacion del vehiculo
   */
  getVehicle() {

    if ( this.licensePlate.value !== '' ) {
      this.getInfoVehicleByLicensePlate();
    } else {
      const message = 'Debe ingresar una placa de un vehículo o escanear su código QR.';
      this.alertServ.getSimpleAlert('ERROR!!', '', message, ['OK']);
    }

  }

  /**
   * Obtiene la información del vehículo
   */
  getInfoVehicleByLicensePlate() {

    this.vehicleServ.getVehicleByLicensePlate( this.licensePlate.value )
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

  /**
   * Redirecciona a la pantalla de escaneo del QR
   */
  scanQRCode() {
    this.router.navigate( ['qrscan'] );
  }

  /**
   * Obtiene la configuracion del slide de la cabecera
   */
  slideHeaderOpt() {
    this.slideOptHeaderOpt = this.loginService.getSlideConfig();
    this.slideOptHeaderOpt.slidesPerView = 1;
    this.slideOptHeaderOpt.autoplay = true;
    this.slideOptHeaderOpt.speed = 2000;
  }

  /**
   * Obtiene la configuracion del slide del pie de pagina
   */
  slideFooterOpt() {
    this.slideOptFooterOpt = this.loginService.getSlideConfig();
    this.slideOptFooterOpt.slidesPerView = 3;
  }

  /**
   * Obtiene las imágenes para el slide que se encuentra en
   * el header de la página
   */
  slideHeader() {
    this.loginService.getHeaderImg( this.empId )
        .subscribe((resp: any) => {
          const slideImgHeader = resp.data;

          slideImgHeader.forEach(element => {

            // se crea un array con la fila de la informacion
            const img = {
              img: this.url + element.url_img
            };

            this.slideImgHeader.push(img);
          });

        }, (error) => {
          this.alertServ.catchError();
        });
  }

  /**
   * Obtiene las imagenes para el slide que se encuentra en
   * el footer de la pagina
   */
  slideFooter() {
    this.loginService.getFooterImg( this.empId )
        .subscribe((resp: any) => {
          const slideImgFooter = resp.data;

          slideImgFooter.forEach(element => {
            const img = {
              img: this.url + element.url_img
            };

            this.slideImgFooter.push(img);
          });
        }, (error) => {
          this.alertServ.catchError();
        });
  }

}
