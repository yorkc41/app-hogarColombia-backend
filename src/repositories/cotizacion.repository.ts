import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Cotizacion, CotizacionRelations, TipoServicio} from '../models';
import {TipoServicioRepository} from './tipo-servicio.repository';

export class CotizacionRepository extends DefaultCrudRepository<
  Cotizacion,
  typeof Cotizacion.prototype.id,
  CotizacionRelations
> {

  public readonly tipoServicio: HasOneRepositoryFactory<TipoServicio, typeof Cotizacion.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('TipoServicioRepository') protected tipoServicioRepositoryGetter: Getter<TipoServicioRepository>,
  ) {
    super(Cotizacion, dataSource);
    this.tipoServicio = this.createHasOneRepositoryFactoryFor('tipoServicio', tipoServicioRepositoryGetter);
    this.registerInclusionResolver('tipoServicio', this.tipoServicio.inclusionResolver);
  }
}
