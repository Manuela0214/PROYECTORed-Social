import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Videojuego} from './videojuego.model';
import {Consola} from './consola.model';

@model()
export class ConsolaJuego extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @belongsTo(() => Videojuego)
  videojuegoId: string;

  @belongsTo(() => Consola)
  consolaId: string;

  constructor(data?: Partial<ConsolaJuego>) {
    super(data);
  }
}

export interface ConsolaJuegoRelations {
  // describe navigational properties here
}

export type ConsolaJuegoWithRelations = ConsolaJuego & ConsolaJuegoRelations;
//ola