import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Persona, Cotizacion} from '../models';
import {PersonaRepository} from './persona.repository';
import {CotizacionRepository} from './cotizacion.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Inmueble.prototype.id>;

  public readonly cotizacion: HasOneRepositoryFactory<Cotizacion, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('CotizacionRepository') protected cotizacionRepositoryGetter: Getter<CotizacionRepository>,
  ) {
    super(Inmueble, dataSource);
    this.cotizacion = this.createHasOneRepositoryFactoryFor('cotizacion', cotizacionRepositoryGetter);
    this.registerInclusionResolver('cotizacion', this.cotizacion.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
