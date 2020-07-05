import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Registro extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  rol: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Registro>) {
    super(data);
  }
}

export interface RegistroRelations {
  // describe navigational properties here
}

export type RegistroWithRelations = Registro & RegistroRelations;
