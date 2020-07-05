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
  Mensajes,
  Usuario,
} from '../models';
import {MensajesRepository} from '../repositories';

export class MensajesUsuarioController {
  constructor(
    @repository(MensajesRepository) protected mensajesRepository: MensajesRepository,
  ) { }

  @get('/mensajes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Mensajes has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.mensajesRepository.usuarios(id).find(filter);
  }

  @post('/mensajes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Mensajes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mensajes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInMensajes',
            exclude: ['id'],
            optional: ['mensajesId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.mensajesRepository.usuarios(id).create(usuario);
  }

  @patch('/mensajes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Mensajes.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.mensajesRepository.usuarios(id).patch(usuario, where);
  }

  @del('/mensajes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Mensajes.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.mensajesRepository.usuarios(id).delete(where);
  }
}
//olaaa