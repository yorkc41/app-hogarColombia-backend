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
  Persona,
  Cotizacion,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaCotizacionController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/cotizacion', {
    responses: {
      '200': {
        description: 'Persona has one Cotizacion',
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
    return this.personaRepository.cotizacion(id).get(filter);
  }

  @post('/personas/{id}/cotizacion', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cotizacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cotizacion, {
            title: 'NewCotizacionInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) cotizacion: Omit<Cotizacion, 'id'>,
  ): Promise<Cotizacion> {
    return this.personaRepository.cotizacion(id).create(cotizacion);
  }

  @patch('/personas/{id}/cotizacion', {
    responses: {
      '200': {
        description: 'Persona.Cotizacion PATCH success count',
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
    return this.personaRepository.cotizacion(id).patch(cotizacion, where);
  }

  @del('/personas/{id}/cotizacion', {
    responses: {
      '200': {
        description: 'Persona.Cotizacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cotizacion)) where?: Where<Cotizacion>,
  ): Promise<Count> {
    return this.personaRepository.cotizacion(id).delete(where);
  }
}
