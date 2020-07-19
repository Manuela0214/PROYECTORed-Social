import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Categoria} from './categoria.model';
import {ConsolaJuego} from './consola-juego.model';
import {Oferta} from './oferta.model';
import {Publicaciones} from './publicaciones.model';

@model()
export class Videojuego extends Entity {
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

  @hasMany(() => Publicaciones)
  publicaciones: Publicaciones[];




  @hasMany(() => ConsolaJuego)
  consolaJuegos: ConsolaJuego[];

  @belongsTo(() => Categoria)
  categoriaId: string;

  @hasMany(() => Oferta)
  ofertas: Oferta[];

  constructor(data?: Partial<Videojuego>) {
    super(data);
  }
}

export interface VideojuegoRelations {
  // describe navigational properties here
}

export type VideojuegoWithRelations = Videojuego & VideojuegoRelations;
//ola
