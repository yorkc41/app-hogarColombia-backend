import {Entity, model, property, hasOne} from '@loopback/repository';
import {TipoServicio} from './tipo-servicio.model';

@model()
export class Cotizacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  id_persona: string;

  @property({
    type: 'string',
    required: true,
  })
  id_inmueble: string;

  @property({
    type: 'string',
    required: true,
  })
  id_tipo_servicio: string;

  @property({
    type: 'string',
  })
  inmuebleId?: string;

  @property({
    type: 'string',
  })
  personaId?: string;

  @hasOne(() => TipoServicio)
  tipoServicio: TipoServicio;

  constructor(data?: Partial<Cotizacion>) {
    super(data);
  }
}

export interface CotizacionRelations {
  // describe navigational properties here
}

export type CotizacionWithRelations = Cotizacion & CotizacionRelations;
