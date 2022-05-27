import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-info-vehicle',
  templateUrl: './info-vehicle.page.html',
  styleUrls: ['./info-vehicle.page.scss'],
})
export class InfoVehiclePage implements OnInit {

  vehicle: any;

  constructor( private vehicleServ: VehicleService ) { }

  ngOnInit() {

    this.vehicle = this.vehicleServ.getDataVehicle();

  }

}
