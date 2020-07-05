import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Mensajes extends Entity {
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
  texto: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario1: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario2: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  constructor(data?: Partial<Mensajes>) {
    super(data);
  }
}

export interface MensajesRelations {
  // describe navigational properties here
}

export type MensajesWithRelations = Mensajes & MensajesRelations;
//ola