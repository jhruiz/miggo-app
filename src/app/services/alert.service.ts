import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( private alertCtrl: AlertController ) { }

  /** Genera una alerta simple */
  async getSimpleAlert(header: string, subHeader: string, message: string, buttons: any) {

    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      mode: 'ios',
      buttons
    });

    await alert.present();
  }

  /**
   * Mensaje de error por defecto para errores no controlados
   */
  async catchError() {
    const alert = await this.alertCtrl.create({
      header: 'ERROR!!!',
      subHeader: '',
      message: 'Se ha producido un error. Por favor, comuníquese con el administrador del sistema o inténtelo mas tarde',
      mode: 'ios',
      buttons: ['OK']
    });

    await alert.present();
  }
}
