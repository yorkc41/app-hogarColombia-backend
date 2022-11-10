import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoServicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  cotizacionId?: string;

  constructor(data?: Partial<TipoServicio>) {
    super(data);
  }
}

export interface TipoServicioRelations {
  // describe navigational properties here
}

export type TipoServicioWithRelations = TipoServicio & TipoServicioRelations;
