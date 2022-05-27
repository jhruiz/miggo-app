import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceGenerateService {

  objFactura: any = {};
  objEmpresa: any = {};
  objCliente: any = {};
  objDetFact: any = {};
  objPagos: any = {};
  objUsuario: any = {};
  objOrdenTrabajo: any = {};
  objRemision: any = {};
  objUbicacion: any = {};
  objNotas: any = {};
  objResolution: any = {};
  detFactura: any = [];
  pdfName = '';

  constructor() { }

  /**
   * Retorna un arreglo con la información del total
   * @param tittle: string
   * @param value: number
   */
  getValueArr( tittle: string, value: any ) {
    return Array(
      { text: '' },
      { text: '' },
      { text: '' },
      { text: tittle, bold: true },
      { text: '$ ' + new Intl.NumberFormat().format(value), alignment: 'right' }
    );
  }

  //////////////////////////////////////////////////////////
  // espacio para la generación del documento equivalente //
  //////////////////////////////////////////////////////////

  /**
   * Obtiene la informacion del documento equivalente seleccionado y la organiza para la generación del pdf
   * @param invoice: any
   */
  equivalentDocumentInfo( invoice: any ) {

    this.detFactura = [];

    this.objFactura = invoice.factura['0'];
    this.objEmpresa = invoice.infoEmpresa['0'];
    this.objCliente = invoice.infoCliente['0'];
    this.objDetFact = invoice;
    this.objPagos = invoice.infoPagos['0'] ? invoice.infoPagos['0'] : null;
    this.objUsuario = invoice.infoUsuario['0'];
    this.objOrdenTrabajo = invoice.ordenTrabajo['0'] ? invoice.ordenTrabajo['0'] : null;
    this.objRemision = invoice.remision['0'] ? invoice.remision['0'] : null;
    this.objUbicacion = invoice.ubicacion['0'];
    this.objNotas = invoice.notaFactura.length ? invoice.notaFactura['0'].descripcion : '';

    // se agrega la cabecera de la tabla de los productos
    const HeaderTable = new Array(
      {text: 'Cant.', style: 'tableHeader', alignment: 'center'},
      {text: 'Descripcion', style: 'tableHeader', alignment: 'center'},
      {text: 'Vlr. Unit', style: 'tableHeader', alignment: 'center'},
      {text: '% Dcto', style: 'tableHeader', alignment: 'center'},
      {text: 'Subtotal', style: 'tableHeader', alignment: 'center'});
    this.detFactura.push(HeaderTable);

    // declaración de variables para los totales
    let costoTtal = 0;
    let dctoTtal = 0;

    // se recorren los productos de la factura
    this.objDetFact.infoDetFact.forEach(element => {

      // se calcula el costo base por la cantidad
      const subTtal = element.cantidad * element.costobase;

      // se crea un array con la fila de la informacion
      const detail = new Array(
        { text: new Intl.NumberFormat().format(element.cantidad), alignment: 'right' },
        { text: element.descripcion },
        { text: '$ ' + new Intl.NumberFormat().format(element.costoventa), alignment: 'right' },
        { text: `${ element.porcentaje }%`, alignment: 'right'},
        { text: '$ ' + new Intl.NumberFormat().format(subTtal), alignment: 'right' }
      );

      // se agrega la descripcion del producto y su venta
      this.detFactura.push(detail);

      // tslint:disable-next-line: radix
      costoTtal += element.valxcant;

      // tslint:disable-next-line: radix
      dctoTtal += element.descuento;

    });

    // Subtotal menos descuento
    const subTtalDDcto = costoTtal - dctoTtal;

    // se agregan el subtotal al documento equivalente
    this.detFactura.push(this.getValueArr( 'SUBTOTAL', subTtalDDcto));

    // se agregan el subtotal al documento equivalente
    const ttalDesc = new Array(
      { text: '' },
      { text: '' },
      { text: '' },
      { text: 'DESCUENTO', bold: true },
      { text: '$ (' + new Intl.NumberFormat().format(dctoTtal) + ')', alignment: 'right' }
    );
    this.detFactura.push(ttalDesc);

    // se agregan el subtotal al documento equivalente
    this.detFactura.push(this.getValueArr( 'TOTAL', costoTtal ));

    // nombre para el pdf
    this.pdfName = `${ this.objCliente.nombre } - RMV.pdf`;

  }

  /**
   * Organiza la información de tal forma que el pdfMaker pueda convertirlo en un pdf
   */
  EquivalentDocumentGenerate() {

    const invoice = {
      content: [
        // encabezado de la factura
        { text: `${ this.objRemision.nombre }`, style: 'header', alignment: 'center' },
        { text: this.objRemision.representantelegal, style: 'header', alignment: 'center' },
        { text: `DOCUMENTO EQUIVALENTE No. ${ this.objFactura.codigo }\n\n`, style: 'header', alignment: 'center'},

        // datos de la empresa
        {
          text: [
            { text: 'Nit: ', bold: true },
            `${ this.objRemision.nit }\n`,
            { text: 'Teléfono: ', bold: true },
            `${ this.objRemision.telefono1 }\n`,
            { text: 'Dirección: ', bold: true },
            `${ this.objRemision.direccion }\n\n`
          ]
        },

        // informacion de la ubicacion y fecha de la factura
        {
          text: `${ this.objUbicacion.ciudad }, ${ this.objUbicacion.pais }, ${ this.objFactura.created }\n\n`
        },

        // informacion del cliente
        {
          columns: [
            {
              text: [
                { text: 'Cliente: ', bold: true },
                `${ this.objCliente.nombre }\n`,
                { text: 'Teléfono: ', bold: true },
                `${ this.objCliente.celular }\n`,
                { text: 'Moto/Placa: ', bold: true },
                `${ this.objOrdenTrabajo.placa }`
              ]
            },
            {
              text: [
                { text: 'Identificación: ', bold: true },
                `${ this.objCliente.nit }\n`,
                { text: 'Dirección: ', bold: true },
                `${ this.objCliente.direccion }\n`,
                { text: 'Linea: ', bold: true },
                `${ this.objOrdenTrabajo.linea }`
              ]
            }
          ]
        },

        // Espacio para el detalle de la factura
        {
          text: `\n`
        },

        // productos de la factura
        {
          style: 'tableExample',
          table: {
            widths: [35, '*', 80, 80, 80],
            body: this.detFactura,
          },
          layout: {
            fillColor: (rowIndex, node, columnIndex) => {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        },

        // Espacio para el detalle de la factura
        {
          text: `\n`
        },

        {
          alignment: 'justify',
          columns: [
            {
              text: [
                {text: 'EMISOR: ', bold: true, fontSize: 10},
                {text: `${this.objRemision.representantelegal}\n`, fontSize: 10},
                {text: 'Nit: ', bold: true, fontSize: 10},
                {text: this.objRemision.nit, fontSize: 10}
              ]
            },
            {
              text: [
                {text: 'CLIENTE: ', bold: true, fontSize: 10},
                {text: `${this.objCliente.nombre}\n`, fontSize: 10},
                {text: 'C.C: ', bold: true, fontSize: 10},
                {text: this.objCliente.nit, fontSize: 10}
              ]
            }
          ]
        },

        // Espacio para el detalle de la factura
        {
          text: `\n`
        },

        // Espacio para el detalle de la factura
        {
          text: [
            {text: 'Nota:', bold: true},
            {text: `${ this.objNotas }\n\n`}
          ]
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


  //////////////////////////////////////////////////////////
  //////// espacio para la generación de la factura ////////
  //////////////////////////////////////////////////////////

  invoiceInfo( invoice: any ) {

    this.detFactura = [];

    this.objFactura = invoice.factura['0'];
    this.objEmpresa = invoice.infoEmpresa['0'];
    this.objCliente = invoice.infoCliente['0'];
    this.objDetFact = invoice;
    this.objPagos = invoice.infoPagos['0'] ? invoice.infoPagos['0'] : null;
    this.objUsuario = invoice.infoUsuario['0'];
    this.objOrdenTrabajo = invoice.ordenTrabajo['0'] ? invoice.ordenTrabajo['0'] : null;
    this.objUbicacion = invoice.ubicacion['0'];
    this.objNotas = invoice.notaFactura.length ? invoice.notaFactura['0'].descripcion : '';
    this.objResolution = invoice.resolucion['0'] ? invoice.resolucion['0'] : null;

    // se agrega la cabecera de la tabla de los productos
    const HeaderTable = new Array(
      {text: 'Cant.', style: 'tableHeader', alignment: 'center'},
      {text: 'Descripcion', style: 'tableHeader', alignment: 'center'},
      {text: 'Vlr. Unit', style: 'tableHeader', alignment: 'center'},
      {text: '% Dcto', style: 'tableHeader', alignment: 'center'},
      {text: 'Subtotal', style: 'tableHeader', alignment: 'center'});
    this.detFactura.push(HeaderTable);

    // declaración de variables para los totales
    let costoTtal = 0;
    let dctoTtal = 0;
    let impTtal = 0;


    this.objDetFact.infoDetFact.forEach(element => {
      // tslint:disable-next-line: radix
      costoTtal += parseInt( element.valxcant );

      // tslint:disable-next-line: radix
      dctoTtal += parseInt( element.descuento );

      // tslint:disable-next-line: radix
      impTtal += parseInt( element.valIva );

      // se crea un array con la fila de la informacion
      const detail = new Array(
        { text: new Intl.NumberFormat().format(element.cantidad), alignment: 'right' },
        { text: element.descripcion },
        { text: '$ ' + new Intl.NumberFormat().format(element.costoventa), alignment: 'right' },
        { text: `${ element.porcentaje }%`, alignment: 'right'},
        { text: '$ ' + new Intl.NumberFormat().format(element.valxcant), alignment: 'right' }
      );

      // se agrega la descripcion del producto y su venta
      this.detFactura.push(detail);
    });

    // se agrega el subtotal de la compra a la factura
    this.detFactura.push(this.getValueArr( 'Subtotal', costoTtal ));

    // se agrega el valor del descuento
    const ttalDesc = new Array(
      { text: '' },
      { text: '' },
      { text: '' },
      { text: 'Descuento', bold: true },
      { text: '$ (' + new Intl.NumberFormat().format(dctoTtal) + ')', alignment: 'right' }
    );
    this.detFactura.push(ttalDesc);

    // Se agrega el subtotal despues del descuento a la factura
    this.detFactura.push(this.getValueArr( 'Subtotal con Dcto.', ( costoTtal - dctoTtal )));

    // Se agrega el valor del iva a la factura
    this.detFactura.push(this.getValueArr( 'IVA', impTtal ));

    // Se agrega el valor del reteica a la factura
    this.detFactura.push(this.getValueArr( 'Reteica', 0 ));

    // Se agrega el valor de la retefuente a la factura
    this.detFactura.push(this.getValueArr( 'Retefuente', 0 ));

    // Se agrega el valor total de la factura
    this.detFactura.push(this.getValueArr( 'TOTAL', (( costoTtal - dctoTtal ) + impTtal) ));

    // Nombre para el pdf
    this.pdfName = `${ this.objCliente.nombre } - FV.pdf`;

  }

  /**
   * Organiza la información de tal forma que el pdfMaker pueda convertirlo en un pdf
   */
  invoiceGenerate() {
    const invoice = {
      content: [
        // encabezado de la factura
        { text: `${ this.objEmpresa.nombre }`, style: 'header', alignment: 'center' },
        { text: `FACTURA DE VENTA No. ${ this.objFactura.consecutivodian }\n\n`, style: 'header', alignment: 'center'},

        // datos de la empresa
        {
          text: [
            { text: 'Nit: ', bold: true },
            `${ this.objEmpresa.nit }\n`,
            { text: 'Teléfono: ', bold: true },
            `${ this.objEmpresa.telefono1 } \ ${ this.objEmpresa.telefono2 }\n`,
            { text: 'Dirección: ', bold: true },
            `${ this.objEmpresa.direccion }\n\n`
          ]
        },

        // informacion de la ubicacion y fecha de la factura
        {
          text: `${ this.objUbicacion.ciudad }, ${ this.objUbicacion.pais }, ${ this.objFactura.created }\n\n`
        },

        {
          text: [
            { text: 'IVA REGIMEN COMUN\n' },
            { text: 'Código de Actividad Económica 4541 Tarifa I.C.A.: 7.7 x MIL\n' },
            { text: 'No somos Grandes Contribuyentes\n' }
          ]
        },

        // Espacio para el detalle de la factura
        {
          text: `\n`
        },

        // informacion del cliente
        {
          columns: [
            {
              text: [
                { text: 'Cliente: ', bold: true },
                `${ this.objCliente.nombre }\n`,
                { text: 'Teléfono: ', bold: true },
                `${ this.objCliente.celular }\n`,
                { text: 'Moto/Placa: ', bold: true },
                `${ this.objOrdenTrabajo.placa }`
              ]
            },
            {
              text: [
                { text: 'Identificación: ', bold: true },
                `${ this.objCliente.nit }\n`,
                { text: 'Dirección: ', bold: true },
                `${ this.objCliente.direccion }\n`,
                { text: 'Linea: ', bold: true },
                `${ this.objOrdenTrabajo.linea }`
              ]
            }
          ]
        },

        // Espacio para el detalle de la factura
        {
          text: `\n`
        },

        // productos de la factura
        {
          style: 'tableExample',
          table: {
            widths: [35, '*', 80, 80, 80],
            body: this.detFactura,
          },
          layout: {
            fillColor: (rowIndex, node, columnIndex) => {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        },

        // Espacio para el detalle de la factura
        {
          text: `\n`
        },

        {
          alignment: 'justify',
          columns: [
            {
              text: [
                {text: 'EMISOR: ', bold: true, fontSize: 10},
                {text: `${this.objEmpresa.nombre}\n`, fontSize: 10},
                {text: 'Nit: ', bold: true, fontSize: 10},
                {text: this.objEmpresa.nit, fontSize: 10}
              ]
            },
            {
              text: [
                {text: 'CLIENTE: ', bold: true, fontSize: 10},
                {text: `${this.objCliente.nombre}\n`, fontSize: 10},
                {text: 'C.C: ', bold: true, fontSize: 10},
                {text: this.objCliente.nit, fontSize: 10}
              ]
            }
          ]
        },

        // Espacio para el detalle de la factura
        {
          text: `\n`
        },

        {
          alignment: 'justify',
          columns: [
            {
              text: this.legalTextFact(), fontSize: 6
            },
            {
              text: [
                { text: `Resolución ${ this.objResolution.resolucionfacturacion }\n`, fontSize: 6, bold: true, alignment: 'right' },
                { text: `Fecha de Resolución ${ this.objResolution.fecharesolucion }\n`, fontSize: 6, bold: true, alignment: 'right' },
                // tslint:disable-next-line: max-line-length
                { text: `Numeración habilitada del ${ this.objResolution.resolucioninicia } al ${ this.objResolution.resolucionfin }\n`, fontSize: 6, bold: true, alignment: 'right' },
                { text: 'Régimen Común', alignment: 'right', fontSize: 6, bold: true }
              ]
            }
          ]
        },

        // Espacio para el detalle de la factura
        {
          text: `\n`
        },

        // Espacio para el detalle de la factura
        {
          text: [
            {text: 'Nota:', bold: true},
            {text: `${ this.objNotas }\n\n`}
          ]
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

  /**
   * Texto para la factura
   */
  legalTextFact() {
    let legalText = 'ESTA FACTURA SE AJUSTA A LO DISPUESTO EN LA LEY 1231 Y DE CONFORMIDAD CON ';
    legalText += 'LOS ART. 621 Y 774 DEL CODIGO DEL COMERCIO, ART 617 DEL E.T. EL COMPRADOR ';
    legalText += 'CON SU FIRMA EXPRESA LA ACEPTACION DEL CONTENIDO DE LA FACTURA EN TODAS ';
    legalText += 'SUS PARTES, ADEMAS QUE EQUIVALE A LA CONSTANCIA DEL RECIBO REAL Y ';
    legalText += 'MATERIAL DE LAS MERCANCIAS Y / O LOS SERVICIOS DESCRITOS EN ESTE TITULO ';
    legalText += 'VALOR, Y SE OBLIGA A PAGAR DENTRO DE LOS TERMINOS Y CONDICIONES AQUI ';
    legalText += 'DESCRITOS AL TENEDOR LEGITIMO DE LA FACTURA EL COMPRADOR NO PODRA ';
    legalText += 'ALEGAR FALTA DE REPRESENTACION O INDEBIDA REPRESENTACION POR RAZON DE ';
    legalText += 'LA PERSONA QUE RECIBA LA MERCANCIA O EL SERVICIO EN SUS DEPENDENCIAS .';

    return legalText;
  }

  /**
   * Retorna el nombre del pdf
   */
  getPdfName() {
    return this.pdfName;
  }
}
