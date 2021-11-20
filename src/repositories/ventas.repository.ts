import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ventas, VentasRelations, Asesor, Factura} from '../models';
import {AsesorRepository} from './asesor.repository';
import {FacturaRepository} from './factura.repository';

export class VentasRepository extends DefaultCrudRepository<
  Ventas,
  typeof Ventas.prototype.id,
  VentasRelations
> {

  public readonly idaseso: BelongsToAccessor<Asesor, typeof Ventas.prototype.id>;

  public readonly factura: HasOneRepositoryFactory<Factura, typeof Ventas.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Ventas, dataSource);
    this.factura = this.createHasOneRepositoryFactoryFor('factura', facturaRepositoryGetter);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.idaseso = this.createBelongsToAccessorFor('idaseso', asesorRepositoryGetter,);
    this.registerInclusionResolver('idaseso', this.idaseso.inclusionResolver);
  }
}
