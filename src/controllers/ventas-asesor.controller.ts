import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ventas,
  Asesor,
} from '../models';
import {VentasRepository} from '../repositories';

export class VentasAsesorController {
  constructor(
    @repository(VentasRepository)
    public ventasRepository: VentasRepository,
  ) { }

  @get('/ventas/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Ventas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Ventas.prototype.id,
  ): Promise<Asesor> {
    return this.ventasRepository.idaseso(id);
  }
}
