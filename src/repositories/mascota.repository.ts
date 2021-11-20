import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly idclient: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Mascota, dataSource);
    this.idclient = this.createBelongsToAccessorFor('idclient', clienteRepositoryGetter,);
    this.registerInclusionResolver('idclient', this.idclient.inclusionResolver);
  }
}
