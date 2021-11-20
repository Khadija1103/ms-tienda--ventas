import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Factura} from './factura.model';

@model()
export class Ventas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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

  @belongsTo(() => Asesor, {name: 'idaseso'})
  idasesor: string;

  @hasOne(() => Factura, {keyTo: 'idventas'})
  factura: Factura;

  constructor(data?: Partial<Ventas>) {
    super(data);
  }
}

export interface VentasRelations {
  // describe navigational properties here
}

export type VentasWithRelations = Ventas & VentasRelations;
