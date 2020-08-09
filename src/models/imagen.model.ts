import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Videojuego} from './videojuego.model';

@model()
export class Imagen extends Entity {
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
  path: string;

  @property({
    type: 'number',
    required: true,
  })
  order: number;

  @belongsTo(() => Videojuego)
  videojuegoId: string;

  constructor(data?: Partial<Imagen>) {
    super(data);
  }
}

export interface ImagenRelations {
  // describe navigational properties here
}

export type ImagenWithRelations = Imagen & ImagenRelations;
