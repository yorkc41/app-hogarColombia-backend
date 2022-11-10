import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Cotizacion} from '../models';
import {CotizacionRepository} from '../repositories';

export class CotizacionController {
  constructor(
    @repository(CotizacionRepository)
    public cotizacionRepository : CotizacionRepository,
  ) {}

  @post('/cotizacions')
  @response(200, {
    description: 'Cotizacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cotizacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cotizacion, {
            title: 'NewCotizacion',
            exclude: ['id'],
          }),
        },
      },
    })
    cotizacion: Omit<Cotizacion, 'id'>,
  ): Promise<Cotizacion> {
    return this.cotizacionRepository.create(cotizacion);
  }

  @get('/cotizacions/count')
  @response(200, {
    description: 'Cotizacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cotizacion) where?: Where<Cotizacion>,
  ): Promise<Count> {
    return this.cotizacionRepository.count(where);
  }

  @get('/cotizacions')
  @response(200, {
    description: 'Array of Cotizacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cotizacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cotizacion) filter?: Filter<Cotizacion>,
  ): Promise<Cotizacion[]> {
    return this.cotizacionRepository.find(filter);
  }

  @patch('/cotizacions')
  @response(200, {
    description: 'Cotizacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cotizacion, {partial: true}),
        },
      },
    })
    cotizacion: Cotizacion,
    @param.where(Cotizacion) where?: Where<Cotizacion>,
  ): Promise<Count> {
    return this.cotizacionRepository.updateAll(cotizacion, where);
  }

  @get('/cotizacions/{id}')
  @response(200, {
    description: 'Cotizacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cotizacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cotizacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Cotizacion>
  ): Promise<Cotizacion> {
    return this.cotizacionRepository.findById(id, filter);
  }

  @patch('/cotizacions/{id}')
  @response(204, {
    description: 'Cotizacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cotizacion, {partial: true}),
        },
      },
    })
    cotizacion: Cotizacion,
  ): Promise<void> {
    await this.cotizacionRepository.updateById(id, cotizacion);
  }

  @put('/cotizacions/{id}')
  @response(204, {
    description: 'Cotizacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cotizacion: Cotizacion,
  ): Promise<void> {
    await this.cotizacionRepository.replaceById(id, cotizacion);
  }

  @del('/cotizacions/{id}')
  @response(204, {
    description: 'Cotizacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cotizacionRepository.deleteById(id);
  }
}
