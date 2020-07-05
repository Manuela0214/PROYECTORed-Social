import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Publicaciones} from './publicaciones.model';

@model()
export class Comentario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  texto?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'any',
  })
  reacciones?: any;

  @property({
    type: 'string',
  })
  respuestas?: string;

  @belongsTo(() => Publicaciones)
  publicacionesId: string;

  constructor(data?: Partial<Comentario>) {
    super(data);
  }
}

export interface ComentarioRelations {
  // describe navigational properties here
}

export type ComentarioWithRelations = Comentario & ComentarioRelations;
//ola
