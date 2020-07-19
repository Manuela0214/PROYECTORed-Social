import {Entity, model, property, hasMany} from '@loopback/repository';
import {ConsolaJuego} from './consola-juego.model';

@model()
export class Consola extends Entity {
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
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => ConsolaJuego)
  consolaJuegos: ConsolaJuego[];

  constructor(data?: Partial<Consola>) {
    super(data);
  }
}

export interface ConsolaRelations {
  // describe navigational properties here
}

export type ConsolaWithRelations = Consola & ConsolaRelations;
