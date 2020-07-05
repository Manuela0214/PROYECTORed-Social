import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Mensajes,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioMensajesController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Mensajes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mensajes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mensajes>,
  ): Promise<Mensajes[]> {
    return this.usuarioRepository.mensajes(id).find(filter);
  }

  @post('/usuarios/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mensajes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensajes, {
            title: 'NewMensajesInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) mensajes: Omit<Mensajes, 'id'>,
  ): Promise<Mensajes> {
    return this.usuarioRepository.mensajes(id).create(mensajes);
  }

  @patch('/usuarios/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Usuario.Mensajes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensajes, {partial: true}),
        },
      },
    })
    mensajes: Partial<Mensajes>,
    @param.query.object('where', getWhereSchemaFor(Mensajes)) where?: Where<Mensajes>,
  ): Promise<Count> {
    return this.usuarioRepository.mensajes(id).patch(mensajes, where);
  }

  @del('/usuarios/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Usuario.Mensajes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mensajes)) where?: Where<Mensajes>,
  ): Promise<Count> {
    return this.usuarioRepository.mensajes(id).delete(where);
  }
}
//ola