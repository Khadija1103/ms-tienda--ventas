import {Entity, model, property, hasOne} from '@loopback/repository';
import {Factura} from './factura.model';

@model()
export class Ventas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  precioventa: number;

  @property({
    type: 'string',
    required: true,
  })
  idproducto: string;

  @property({
    type: 'string',
    required: true,
  })
  idcliente: string;

  @property({
    type: 'string',
    required: true,
  })
  idasesor: string;

  @property({
    type: 'string',
    required: true,
  })
  idproductooservicio: string;

  @property({
    type: 'string',
  })
  idfactura?: string;

  @hasOne(() => Factura, {keyTo: 'idventa'})
  factura: Factura;

  constructor(data?: Partial<Ventas>) {
    super(data);
  }
}

export interface VentasRelations {
  // describe navigational properties here
}

export type VentasWithRelations = Ventas & VentasRelations;
