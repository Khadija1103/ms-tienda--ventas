import {Entity, model, property, hasOne} from '@loopback/repository';
import {Ventas} from './ventas.model';

@model()
export class Factura extends Entity {
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
  consecutivo: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  percioventa: number;

  @property({
    type: 'string',
  })
  idventas?: string;

  @hasOne(() => Ventas, {keyTo: 'idfactura'})
  ventas: Ventas;

  @property({
    type: 'string',
  })
  idventa?: string;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
