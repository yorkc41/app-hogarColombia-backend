import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Persona, PersonaRelations, Inmueble, Cotizacion} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {CotizacionRepository} from './cotizacion.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Persona.prototype.id>;

  public readonly cotizacion: HasOneRepositoryFactory<Cotizacion, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('CotizacionRepository') protected cotizacionRepositoryGetter: Getter<CotizacionRepository>,
  ) {
    super(Persona, dataSource);
    this.cotizacion = this.createHasOneRepositoryFactoryFor('cotizacion', cotizacionRepositoryGetter);
    this.registerInclusionResolver('cotizacion', this.cotizacion.inclusionResolver);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
