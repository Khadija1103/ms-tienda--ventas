import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Factura,
  Ventas,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaVentasController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/ventas', {
    responses: {
      '200': {
        description: 'Factura has one Ventas',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ventas),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: number,
    @param.query.object('filter') filter?: Filter<Ventas>,
  ): Promise<Ventas> {
    return this.facturaRepository.ventas(id).get(filter);
  }

  @post('/facturas/{id}/ventas', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ventas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventas, {
            title: 'NewVentasInFactura',
            exclude: ['id'],
            optional: ['idfactura']
          }),
        },
      },
    }) ventas: Omit<Ventas, 'id'>,
  ): Promise<Ventas> {
    return this.facturaRepository.ventas(id).create(ventas);
  }

  @patch('/facturas/{id}/ventas', {
    responses: {
      '200': {
        description: 'Factura.Ventas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventas, {partial: true}),
        },
      },
    })
    ventas: Partial<Ventas>,
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where<Ventas>,
  ): Promise<Count> {
    return this.facturaRepository.ventas(id).patch(ventas, where);
  }

  @del('/facturas/{id}/ventas', {
    responses: {
      '200': {
        description: 'Factura.Ventas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where<Ventas>,
  ): Promise<Count> {
    return this.facturaRepository.ventas(id).delete(where);
  }
}
