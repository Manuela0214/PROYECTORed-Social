import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Videojuego} from './videojuego.model';

@model()
export class Oferta extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  enlaceTienda: string;
  /*
  @property({
    type: 'string',
  })
  idVideojuego?: string;*/

  @belongsTo(() => Videojuego)
  videojuegoId: string;

  constructor(data?: Partial<Oferta>) {
    super(data);
  }
}

export interface OfertaRelations {
  // describe navigational properties here
}

export type OfertaWithRelations = Oferta & OfertaRelations;
//ola
