import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkorderGenerateService {

  objClient: any = {};
  objCompany: any = {};
  objEstadoOrden: any = {};
  objOrder: any = {};
  objParts: any = {};
  objSupplies: any = {};
  objUser: any = {};
  objVehicle: any = {};
  objUbicacion: any = {};
  detPartDetails: any = [];
  detSupplies: any = [];
  pdfName = '';

  constructor() { }

  /**
   * Retorna un arreglo con la cabecera de la tabla partes
   */
  partsHeader() {
    return Array(
      {text: 'Parte', style: 'tableHeader', alignment: 'center'},
      {text: 'Estado', style: 'tableHeader', alignment: 'center'},
      {text: 'Parte', style: 'tableHeader', alignment: 'center'},
      {text: 'Estado', style: 'tableHeader', alignment: 'center'});
  }

  /**
   * Retorna un arreglo con la cabecera de la tabla suministros
   */
  suppliesHeader() {
    return Array(
      {text: 'Cantidad', style: 'tableHeader', alignment: 'center'},
      {text: 'Nombre', style: 'tableHeader', alignment: 'center'},
    );
  }

  /**
   * Obtiene la información de la orden de trabajo seleccionada y la organiza para la generación del pdf
   */
  workOrderInfo( woData: any) {

    this.detPartDetails = [];
    this.detSupplies = [];

    this.objClient = woData.cliente['0'];
    this.objCompany = woData.empresa['0'];
    this.objEstadoOrden = woData.estadoOrden['0'];
    this.objOrder = woData.ordenTrabajo['0'];
    this.objParts = woData.partevehiculos;
    this.objSupplies = woData.suministros;
    this.objUser = woData.usuario['0'];
    this.objVehicle = woData.vehiculo['0'];
    this.objUbicacion = woData.ubicacion['0'];

    this.detPartDetails.push( this.partsHeader() );
    // se recorre el arreglo de partes del vehiculo
    let contP = 1;
    let detParts = [];
    this.objParts.forEach( element => {

      // se crea el objeto con la parte
      const objPart = { text: element.partevehiculo };

      // se crea el objeto con el estado de la parte
      const objEst = { text: element.estadoparte };

      detParts.push(objPart, objEst);

      if ( contP === 2 ) {
        this.detPartDetails.push( detParts );
        contP = 0;
        detParts = [];
      }

      contP++;

    });

    this.detSupplies.push( this.suppliesHeader() );
    // se recorre el arreglo de suministros
    this.objSupplies.forEach( element => {
      // se crea un array con la fila de la informacion
      const supplies = new Array(
        { text: element.cantidad, alignment: 'center' },
        { text: element.descripcion },
      );

      // se agrega la descripcion del producto y su venta
      this.detSupplies.push(supplies);
    });

    // Nombre para el pdf
    this.pdfName = `${ this.objClient.nombre } - OT.pdf`;
  }

  workOrderGenerate() {
    const invoice = {
      content: [
        // encabezado de la orden de trabajo
        { text: 'TORQUE RACING', style: 'header', alignment: 'center' },
        { text: 'Orden de Trabajo\n\n', style: 'header', alignment: 'center'},

        // datos de la empresa
        {
          text: [
            { text: 'Nit: ', bold: true },
            `${ this.objCompany.nit }\n`,
            { text: 'Teléfono: ', bold: true },
            `${ this.objCompany.telefono1 } \ ${ this.objCompany.telefono2 }\n`,
            { text: 'Dirección: ', bold: true },
            `${ this.objCompany.direccion }\n\n`
          ]
        },

        // informacion de la ubicacion y fecha de la orden
        {
          text: `${ this.objUbicacion.ciudad }, ${ this.objUbicacion.pais }, ${ this.objOrder.fecha_ingreso }\n`
        },

        // Salto de linea
        {
          text: `\n`
        },

        // informacion del cliente
        {
          columns: [
            {
              text: [
                { text: 'Cliente: ', bold: true },
                `${ this.objClient.nombre }\n`,
                { text: 'Teléfono: ', bold: true },
                `${ this.objClient.celular }\n`,
                { text: 'Moto/Placa: ', bold: true },
                `${ this.objVehicle.placa }`
              ]
            },
            {
              text: [
                { text: 'Identificación: ', bold: true },
                `${ this.objClient.nit }\n`,
                { text: 'Dirección: ', bold: true },
                `${ this.objClient.direccion }\n`,
                { text: 'Linea: ', bold: true },
                `${ this.objVehicle.linea }`
              ]
            }
          ]
        },

        // Salto de linea
        {
          text: `\n`
        },

        {
          text : [
            { text: 'Kilometraje ', bold: true },
            { text: `${ this.objOrder.kilometraje }\n` },
            { text: 'Orden de Trabajo # ', bold: true },
            { text: `${ this.objOrder.codigo }\n` },
            { text: 'Fecha de Ingreso: ', bold: true },
            { text: `${ this.objOrder.fecha_ingreso } ` },
            { text: 'Fecha de Salida: ', bold: true },
            { text: `${ this.objOrder.fecha_salida }` }
          ]
        },

        // Salto de linea
        {
          text: `\n`
        },

        { text: 'Partes del Vehículo', style: 'header', alignment: 'center' },

        // estado partes
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*', '*', '*'],
            body: this.detPartDetails,
          },
          layout: {
            fillColor: (rowIndex, node, columnIndex) => {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        },

        // Salto de linea
        {
          text: `\n`
        },

        {
          text : [
            { text: 'Observaciones cliente\n', bold: true },
            { text: `${ this.objOrder.observaciones_cliente }\n`, fontSize: 8},
            { text: 'Observaciones técnico\n', bold: true },
            { text: `${ this.objOrder.observaciones_usuario }\n`, fontSize: 8}
          ]
        },

        // Salto de linea
        {
          text: `\n`
        },

        { text: 'Repuestos/Suministros', style: 'header', alignment: 'center' },

        // estado partes
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            body: this.detSupplies,
          },
          layout: {
            fillColor: (rowIndex, node, columnIndex) => {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        },

        // Salto de linea
        {
          text: `\n`
        },

        {
          alignment: 'justify',
          columns: [
            {
              text: [
                {text: 'EMISOR: ', bold: true, fontSize: 10},
                {text: `${this.objCompany.nombre}\n`, fontSize: 10},
                {text: 'Nit: ', bold: true, fontSize: 10},
                {text: this.objCompany.nit, fontSize: 10}
              ]
            },
            {
              text: [
                {text: 'CLIENTE: ', bold: true, fontSize: 10},
                {text: `${this.objClient.nombre}\n`, fontSize: 10},
                {text: 'C.C: ', bold: true, fontSize: 10},
                {text: this.objClient.nit, fontSize: 10}
              ]
            }
          ]
        },

        // Salto de linea
        {
          text: `\n`
        },

        {
          text: this.conditionsText(), fontSize: 6, alignment: 'justify'
        },

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };

    return invoice;
  }

  conditionsText() {
    let condText = 'Condiciones del Contrato: 1. El cliente autoriza a quien firma ';
    condText += 'en el presente contrato a ordenar y contratar con el centro de servicio, la ';
    condText += 'ejecución de los respectivos trabajos y por tanto da fe que conoce y acepta ';
    condText += 'en su totalidad las condiciones que son parte integrante del ';
    condText += 'contrato que se celebra y consta en el presente documento. 2. ';
    condText += 'El centro de servicio queda facultado para realizar las pruebas que ';
    condText += 'requiera el vehiculó por fuera del taller. 3. El centro de servicio ';
    condText += 'no se hacer responsable por objetos dejados dentro del vehiculo. 4. El ';
    condText += 'cliente o la persona autorizada. Faculta expresamente al taller. ';
    condText += 'TOQUE RACING S.A.S., a ejercer el derecho de retención del vehiculo. 5. ';
    condText += 'El centro de servicio no se hace responsable por daños o deterioro del vehiculo. ';
    condText += 'Si estos se presentan por causas de fuerza mayor o ';
    condText += 'extensión de tiempo causado por el cliente. 6. El propietario o autorizado ';
    condText += 'firmante del presente contrato, se comprometen a reconocer un ';
    condText += 'valor de cinco mil pesos m/cte. ($ 5.000) por concepto de parqueo, ';
    condText += 'por cada día que transcurra desde que finalice los trabajos hasta el ';
    condText += 'momento de retiro del vehiculo. 7. Aclaraciones: En el momento de la ';
    condText += 'entrada del vehículo se debe cancelar el total del valor de los ';
    condText += 'repuestos. Si la orden de trabajo se encuentra terminada y su vehículo ';
    condText += 'no ha sido recogido en los próximos 4 días posterior a esta, al día ';
    condText += '5 se le procedera a efectuar un cobro de parqueadero de valor de $5.500 pesos diario.';
    return condText;
  }

  /**
   * Retorna el nombre del pdf
   */
  getPdfName() {
    return this.pdfName;
  }
}
