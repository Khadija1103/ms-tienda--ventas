import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Factura, FacturaRelations, Ventas} from '../models';
import {VentasRepository} from './ventas.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly ventas: HasOneRepositoryFactory<Ventas, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Factura, dataSource);
    this.ventas = this.createHasOneRepositoryFactoryFor('ventas', ventasRepositoryGetter);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
  }
}
