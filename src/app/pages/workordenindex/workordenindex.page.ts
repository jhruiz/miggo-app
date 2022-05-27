import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { WorkorderService } from '../../services/workorder.service';
import { Observable } from 'rxjs';
import { ComponenteOrdenTrabajo } from '../../interfaces/interfaces';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { WorkorderGenerateService } from '../../services/workorder-generate.service';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-workordenindex',
  templateUrl: './workordenindex.page.html',
  styleUrls: ['./workordenindex.page.scss'],
})
export class WorkordenindexPage implements OnInit {

  workOrders: Observable<ComponenteOrdenTrabajo[]>;
  pdfObject: any = {};

  constructor(  private vehicleServ: VehicleService,
                private alertServ: AlertService,
                private router: Router,
                private workOrdServ: WorkorderService,
                private fileOpener: FileOpener,
                private file: File,
                private workOrdGenServ: WorkorderGenerateService ) { }

  ngOnInit() {
    // Obtiene la informacion del vehiculo
    const vehicle = this.vehicleServ.getDataVehicle();

    // Obtiene las ordenes de trabajo asociadas al vehículo y redirige al listado de las mismas
    this.workOrdServ.getWorkOrdersByVehicle(vehicle.idVehiculo)
        .subscribe((resp: any) => {
          if ( resp.estado ) {

            this.workOrders = resp.data;

          } else {

            this.alertServ.getSimpleAlert('INFORMACION!!!', '', resp.mensaje, ['OK']);
            this.router.navigate( ['home'] );

          }
        }, (error: any) => {

          this.alertServ.catchError();
          this.router.navigate( ['home'] );

        });
  }

  /**
   * Redirecciona a la pagina donde se muestra el detalle de la orden de trabajo
   * @param id: number
   */
  viewWorkOrder( id: number ) {
    this.router.navigate(['workordenview', id]);
  }

  /**
   * Imprime la orden de trabajo relacionada al vehículo
   */
  printWorkOrder( id: number ) {
    this.workOrdServ.getWorkOrderById ( id.toString() )
        .subscribe((resp: any) => {

          if ( resp.estado ) {

            // organiza la informacion de la factura
            this.workOrdGenServ.workOrderInfo( resp.data );

            // // organiza la informacion de la factura en un pdf
            const infoPdfInv = this.workOrdGenServ.workOrderGenerate();

            this.pdfObject = pdfMake.createPdf(infoPdfInv);

            this.pdfObject.download();

            this.openInvoicePDF();

          } else {
            // si no se encuentran datos de la factura, regresa al listado
            this.router.navigate( ['workordenindex'] );
          }

        }, (error) => {
          this.alertServ.catchError();
        });
  }

  /**
   * Abre el pdf en el movil
   */
  openInvoicePDF() {
    this.pdfObject.getBuffer( (buffer) => {
      const blob = new Blob([buffer], { type: 'application/pdf' });

      const pdfName = this.workOrdGenServ.getPdfName();

      // genera y guarda el pdf
      this.file.writeFile( this.file.dataDirectory, pdfName, blob, { replace: true})
              .then(fileEntry => {
                this.fileOpener.open(this.file.dataDirectory + pdfName, 'application/pdf');
              });
    });

    return true;
  }

}
