import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Publicaciones} from './publicaciones.model';
import {Amistad} from './amistad.model';
import {Mensajes} from './mensajes.model';
import {Etiquetado} from './etiquetado.model';
import {Registro} from './registro.model';

@model()
export class Usuario extends Entity {
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
  primer_nombre: string;

  @property({
    type: 'string',
  })
  segundo_nombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_apellido: string;

  @property({
    type: 'string',
  })
  segundo_apellido?: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  pais: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  foto_perfil: string;

  @property({
    type: 'string',
  })
  genero?: string;

  @property({
    type: 'string',
    required: true,
  })
  intereses: string;

  @hasMany(() => Publicaciones, {keyTo: 'id_usuario'})
  publicaciones: Publicaciones[];

  @hasMany(() => Amistad)
  amistades: Amistad[];

  @hasMany(() => Mensajes)
  mensajes: Mensajes[];

  @property({
    type: 'string',
  })
  mensajesId?: string;

  @hasMany(() => Etiquetado)
  etiquetados: Etiquetado[];

  @hasOne(() => Registro)
  registro: Registro;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
//ola