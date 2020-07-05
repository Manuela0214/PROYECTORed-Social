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
  Amistad,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioAmistadController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/amistads', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Amistad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Amistad)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Amistad>,
  ): Promise<Amistad[]> {
    return this.usuarioRepository.amistades(id).find(filter);
  }

  @post('/usuarios/{id}/amistads', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Amistad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Amistad, {
            title: 'NewAmistadInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) amistad: Omit<Amistad, 'id'>,
  ): Promise<Amistad> {
    return this.usuarioRepository.amistades(id).create(amistad);
  }

  @patch('/usuarios/{id}/amistads', {
    responses: {
      '200': {
        description: 'Usuario.Amistad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Amistad, {partial: true}),
        },
      },
    })
    amistad: Partial<Amistad>,
    @param.query.object('where', getWhereSchemaFor(Amistad)) where?: Where<Amistad>,
  ): Promise<Count> {
    return this.usuarioRepository.amistades(id).patch(amistad, where);
  }

  @del('/usuarios/{id}/amistads', {
    responses: {
      '200': {
        description: 'Usuario.Amistad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Amistad)) where?: Where<Amistad>,
  ): Promise<Count> {
    return this.usuarioRepository.amistades(id).delete(where);
  }
}
//ola