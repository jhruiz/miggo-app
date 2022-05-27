import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { WorkorderService } from '../../services/workorder.service';

@Component({
  selector: 'app-workordenview',
  templateUrl: './workordenview.page.html',
  styleUrls: ['./workordenview.page.scss'],
})
export class WorkordenviewPage implements OnInit {

  idWorkOrder = '';
  cliente: any = {};
  estadoOrden: any = {};
  ordenTrabajo: any = {};
  partesVehiculos: any = {};
  suministros: any = {};
  usuario: any = {};
  vehiculo: any = {};
  empresa: any = {};

  constructor(  private route: ActivatedRoute,
                private alertServ: AlertService,
                private router: Router,
                private workOrdServ: WorkorderService ) { }

  ngOnInit() {
    this.idWorkOrder = this.route.snapshot.params.id;

    this.getWorkOrderSelected();
  }

  /**
   * Obtiene la orden de trabajo seleccionada
   */
  getWorkOrderSelected() {

    this.workOrdServ.getWorkOrderById ( this.idWorkOrder )
        .subscribe((resp: any) => {

          if ( resp.estado ) {
            this.empresa = resp.data.empresa['0'];
            this.cliente = resp.data.cliente['0'];
            this.estadoOrden = resp.data.estadoOrden['0'];
            this.ordenTrabajo = resp.data.ordenTrabajo['0'];
            this.partesVehiculos = resp.data.partevehiculos['0'];
            this.suministros = resp.data;
            this.usuario = resp.data.usuario['0'];
            this.vehiculo = resp.data.vehiculo['0'];

          } else {
            // si no se encuentran datos de la factura, regresa al listado
            this.router.navigate( ['workordenindex'] );
          }

        });
  }

}
