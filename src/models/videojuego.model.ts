import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Publicaciones} from './publicaciones.model';
import {Oferta} from './oferta.model';
import {Categoria} from './categoria.model';
import {ConsolaJuego} from './consola-juego.model';

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

  @hasMany(() => Oferta, {keyTo: 'idVideojuego'})
  ofertas: Oferta[];

  @belongsTo(() => Categoria)
  categoriaId: string;

  @hasOne(() => ConsolaJuego)
  consolaJuego: ConsolaJuego;

  constructor(data?: Partial<Videojuego>) {
    super(data);
  }
}

export interface VideojuegoRelations {
  // describe navigational properties here
}

export type VideojuegoWithRelations = Videojuego & VideojuegoRelations;
//ola