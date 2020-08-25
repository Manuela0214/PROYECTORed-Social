import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Categoria} from './categoria.model';
import {ConsolaJuego} from './consola-juego.model';
import {Imagen} from './imagen.model';
import {Oferta} from './oferta.model';

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





  @hasMany(() => ConsolaJuego)
  consolaJuegos: ConsolaJuego[];

  @belongsTo(() => Categoria)
  categoriaId: string;

  @hasMany(() => Oferta)
  ofertas: Oferta[];

  @hasMany(() => Imagen)
  imagenes: Imagen[];

  constructor(data?: Partial<Videojuego>) {
    super(data);
  }
}

export interface VideojuegoRelations {
  // describe navigational properties here
}

export type VideojuegoWithRelations = Videojuego & VideojuegoRelations;
//ola
