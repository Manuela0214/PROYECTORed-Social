import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Comentario} from './comentario.model';
import {Etiquetado} from './etiquetado.model';
import {Usuario} from './usuario.model';
import {Videojuego} from './videojuego.model';

@model()
export class Publicaciones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  fotos?: string;

  @property({
    type: 'string',
  })
  videos?: string;

  @property({
    type: 'string',
  })
  texto?: string;

  @property({
    type: 'any',
  })
  reacciones?: any;

  @property({
    type: 'string',
  })
  id_usuario?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => Comentario)
  comentarios: Comentario[];

  @belongsTo(() => Videojuego)
  videojuegoId: string;

  @hasMany(() => Etiquetado)
  etiquetados: Etiquetado[];

  constructor(data?: Partial<Publicaciones>) {
    super(data);
  }
}

export interface PublicacionesRelations {
  // describe navigational properties here
}

export type PublicacionesWithRelations = Publicaciones & PublicacionesRelations;
//ola
