import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Publicaciones} from './publicaciones.model';
import {Usuario} from './usuario.model';

@model()
export class Etiquetado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Publicaciones)
  publicacionesId: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Etiquetado>) {
    super(data);
  }
}

export interface EtiquetadoRelations {
  // describe navigational properties here
}

export type EtiquetadoWithRelations = Etiquetado & EtiquetadoRelations;
//ola