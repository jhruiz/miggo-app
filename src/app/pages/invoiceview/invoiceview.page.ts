import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-invoiceview',
  templateUrl: './invoiceview.page.html',
  styleUrls: ['./invoiceview.page.scss'],
})
export class InvoiceviewPage implements OnInit {

  idInvoice = '';
  objFactura: any = {};
  objEmpresa: any = {};
  objCliente: any = {};
  objDetFact: any = {};
  objPagos: any = {};
  objUsuario: any = {};
  objOrdenTrabajo: any = {};
  objRemision: any = {};
  objUbicacion: any = {};
  costoTtal = 0;
  dctoTtal = 0;
  valorIva = 0;
  ttalFinal = 0;
  subTtalDDcto = 0;
  ttalFinalSI = 0;

  constructor(  private route: ActivatedRoute,
                private invoiceServ: InvoiceService,
                private alertServ: AlertService,
                private router: Router ) { }

  ngOnInit() {
    this.idInvoice = this.route.snapshot.params.id;
    this.getInvoiceSelected();
  }

  getInvoiceSelected() {
    this.invoiceServ.getInvoiceById( this.idInvoice )
        .subscribe((resp: any) => {

          if (resp.estado) {

            this.objFactura = resp.data.factura['0'];
            this.objEmpresa = resp.data.infoEmpresa['0'];
            this.objCliente = resp.data.infoCliente['0'];
            this.objDetFact = resp.data;
            this.objPagos = resp.data.infoPagos['0'] ? resp.data.infoPagos['0'] : null;
            this.objUsuario = resp.data.infoUsuario['0'];
            this.objOrdenTrabajo = resp.data.ordenTrabajo['0'] ? resp.data.ordenTrabajo['0'] : null;
            this.objRemision = resp.data.remision['0'] ? resp.data.remision['0'] : null;
            this.objUbicacion = resp.data.ubicacion['0'];

            this.objDetFact.infoDetFact.forEach(element => {
              // tslint:disable-next-line: radix
              this.costoTtal += parseInt( element.valxcant );

              // tslint:disable-next-line: radix
              this.dctoTtal += parseInt( element.descuento );

              // tslint:disable-next-line: radix
              this.valorIva += parseInt( element.valIva );
            });

            this.subTtalDDcto = this.costoTtal - this.dctoTtal;

            // total final con impuestos
            this.ttalFinal = this.subTtalDDcto + this.valorIva;

            // total final sin impuestos
            this.ttalFinalSI = this.costoTtal - this.dctoTtal;

          } else {
            // si no se encuentran datos de la factura, regresa al listado
            this.router.navigate( ['invoiceindex'] );
          }

        }, (error) => {
          this.alertServ.catchError();
        });
  }

  /**
   * Redirecciona a la página que contiene el detalle de la orden de trabajo
   * @param id: number
   */
  viewOrder( id: number ) {
    this.router.navigate(['workordenview', id]);
  }

}
