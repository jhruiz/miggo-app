import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { InvoiceService } from '../../services/invoice.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponenteFacturas } from '../../interfaces/interfaces';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { InvoiceGenerateService } from '../../services/invoice-generate.service';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoiceindex',
  templateUrl: './invoiceindex.page.html',
  styleUrls: ['./invoiceindex.page.scss'],
})
export class InvoiceindexPage implements OnInit {

  invoices: Observable<ComponenteFacturas[]>;
  pdfObject: any = {};

  constructor(  private vehicleServ: VehicleService,
                private invoiceServ: InvoiceService,
                private alertServ: AlertService,
                private router: Router,
                private fileOpener: FileOpener,
                private file: File,
                private invoiceGeneService: InvoiceGenerateService ) { }

  ngOnInit() {
    // Obtiene la informacion del vehiculo
    const vehicle = this.vehicleServ.getDataVehicle();

    if ( vehicle ) {
          // Obtiene las facturas asociadas al vehículo y redirige al listado de las mismas
          this.invoiceServ.getInvoicesByVehicle( vehicle.idVehiculo )
              .subscribe((resp: any) => {
                if ( resp.estado ) {
                  this.invoices = resp.data;
                } else {
                  this.alertServ.getSimpleAlert('INFORMACION!!!', '', resp.mensaje, ['OK']);
                  this.router.navigate( ['home'] );
                }
              }, (error: any) => {
                this.alertServ.catchError();
                this.router.navigate( ['home'] );
              });
    } else {
      this.alertServ.getSimpleAlert( 'UPSS!!!', '', 'No se encontró el vehiculo', ['OK'] );
      this.router.navigate( ['home'] );
    }
  }

  /**
   * Redirecciona a la de invoiceview para obtener la información de la factura con el id seleccionado
   * @param id: string
   */
  viewInvoice( id: string ) {
    this.router.navigate(['invoiceview', id]);
  }

  /**
   * Imprime la factura o documento equivalente
   * @param id: string
   */
  async printInvoice( id: string ) {

    this.invoiceServ.getInvoiceById( id )
        .subscribe((resp: any) => {

          if (resp.estado) {

            let infoPdfInv: any;

            if ( resp.data.factura['0'].factura ) {
              // organiza la informacion de la factura
              this.invoiceGeneService.invoiceInfo( resp.data );

              // // organiza la informacion de la factura en un pdf
              infoPdfInv = this.invoiceGeneService.invoiceGenerate();
            } else {

              // organiza la informacion de la factura
              this.invoiceGeneService.equivalentDocumentInfo( resp.data );

              // organiza la informacion de la factura en un pdf
              infoPdfInv = this.invoiceGeneService.EquivalentDocumentGenerate();
            }

            this.pdfObject = pdfMake.createPdf(infoPdfInv);

            this.pdfObject.download();

            this.openInvoicePDF();

          } else {
            // si no se encuentran datos de la factura, regresa al listado
            this.router.navigate( ['invoiceindex'] );
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

      const pdfName = this.invoiceGeneService.getPdfName();

      // genera y guarda el pdf
      this.file.writeFile( this.file.dataDirectory, pdfName, blob, { replace: true})
              .then(fileEntry => {
                this.fileOpener.open(this.file.dataDirectory + pdfName, 'application/pdf');
              });
    });

    return true;
  }

}
