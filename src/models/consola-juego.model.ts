import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Consola} from './consola.model';
import {Videojuego} from './videojuego.model';

@model()
export class ConsolaJuego extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @belongsTo(() => Consola)
  consolaId: string;

  @belongsTo(() => Videojuego)
  videojuegoId: string;

  constructor(data?: Partial<ConsolaJuego>) {
    super(data);
  }
}

export interface ConsolaJuegoRelations {
  // describe navigational properties here
}

export type ConsolaJuegoWithRelations = ConsolaJuego & ConsolaJuegoRelations;
