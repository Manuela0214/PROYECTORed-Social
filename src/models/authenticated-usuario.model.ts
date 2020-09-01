import {Model, model, property} from '@loopback/repository';

@model()
export class AuthenticatedUsuario extends Model {
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
  nombre_usuario: string;

  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  usuarioId: string;

  @property({
    type: 'number',
    required: true,
  })
  rol: number;


  constructor(data?: Partial<AuthenticatedUsuario>) {
    super(data);
  }
}

export interface AuthenticatedUsuarioRelations {
  // describe navigational properties here
}

export type AuthenticatedUsuarioWithRelations = AuthenticatedUsuario & AuthenticatedUsuarioRelations;
