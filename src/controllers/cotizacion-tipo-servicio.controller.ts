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
  Cotizacion,
  TipoServicio,
} from '../models';
import {CotizacionRepository} from '../repositories';

export class CotizacionTipoServicioController {
  constructor(
    @repository(CotizacionRepository) protected cotizacionRepository: CotizacionRepository,
  ) { }

  @get('/cotizacions/{id}/tipo-servicio', {
    responses: {
      '200': {
        description: 'Cotizacion has one TipoServicio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoServicio),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoServicio>,
  ): Promise<TipoServicio> {
    return this.cotizacionRepository.tipoServicio(id).get(filter);
  }

  @post('/cotizacions/{id}/tipo-servicio', {
    responses: {
      '200': {
        description: 'Cotizacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cotizacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoServicio, {
            title: 'NewTipoServicioInCotizacion',
            exclude: ['id'],
            optional: ['cotizacionId']
          }),
        },
      },
    }) tipoServicio: Omit<TipoServicio, 'id'>,
  ): Promise<TipoServicio> {
    return this.cotizacionRepository.tipoServicio(id).create(tipoServicio);
  }

  @patch('/cotizacions/{id}/tipo-servicio', {
    responses: {
      '200': {
        description: 'Cotizacion.TipoServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoServicio, {partial: true}),
        },
      },
    })
    tipoServicio: Partial<TipoServicio>,
    @param.query.object('where', getWhereSchemaFor(TipoServicio)) where?: Where<TipoServicio>,
  ): Promise<Count> {
    return this.cotizacionRepository.tipoServicio(id).patch(tipoServicio, where);
  }

  @del('/cotizacions/{id}/tipo-servicio', {
    responses: {
      '200': {
        description: 'Cotizacion.TipoServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoServicio)) where?: Where<TipoServicio>,
  ): Promise<Count> {
    return this.cotizacionRepository.tipoServicio(id).delete(where);
  }
}
