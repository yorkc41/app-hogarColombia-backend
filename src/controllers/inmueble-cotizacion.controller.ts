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
  Inmueble,
  Cotizacion,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleCotizacionController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/cotizacion', {
    responses: {
      '200': {
        description: 'Inmueble has one Cotizacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cotizacion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cotizacion>,
  ): Promise<Cotizacion> {
    return this.inmuebleRepository.cotizacion(id).get(filter);
  }

  @post('/inmuebles/{id}/cotizacion', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cotizacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cotizacion, {
            title: 'NewCotizacionInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) cotizacion: Omit<Cotizacion, 'id'>,
  ): Promise<Cotizacion> {
    return this.inmuebleRepository.cotizacion(id).create(cotizacion);
  }

  @patch('/inmuebles/{id}/cotizacion', {
    responses: {
      '200': {
        description: 'Inmueble.Cotizacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cotizacion, {partial: true}),
        },
      },
    })
    cotizacion: Partial<Cotizacion>,
    @param.query.object('where', getWhereSchemaFor(Cotizacion)) where?: Where<Cotizacion>,
  ): Promise<Count> {
    return this.inmuebleRepository.cotizacion(id).patch(cotizacion, where);
  }

  @del('/inmuebles/{id}/cotizacion', {
    responses: {
      '200': {
        description: 'Inmueble.Cotizacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cotizacion)) where?: Where<Cotizacion>,
  ): Promise<Count> {
    return this.inmuebleRepository.cotizacion(id).delete(where);
  }
}
