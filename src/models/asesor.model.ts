import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ventas} from './ventas.model';
import {Cliente} from './cliente.model';

@model()
export class Asesor extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  cc: string;

  @hasMany(() => Ventas, {keyTo: 'idasesor'})
  ventas: Ventas[];

  @hasMany(() => Cliente, {keyTo: 'idasesor'})
  clientes: Cliente[];

  @property({
    type: 'string',
  })
  idcliente?: string;

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
