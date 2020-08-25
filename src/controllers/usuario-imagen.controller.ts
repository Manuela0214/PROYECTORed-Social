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
  Imagen,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioImagenController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/imagens', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Imagen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Imagen)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Imagen>,
  ): Promise<Imagen[]> {
    return this.usuarioRepository.imagenes(id).find(filter);
  }

  @post('/usuarios/{id}/imagens', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Imagen)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {
            title: 'NewImagenInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) imagen: Omit<Imagen, 'id'>,
  ): Promise<Imagen> {
    return this.usuarioRepository.imagenes(id).create(imagen);
  }

  @patch('/usuarios/{id}/imagens', {
    responses: {
      '200': {
        description: 'Usuario.Imagen PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {partial: true}),
        },
      },
    })
    imagen: Partial<Imagen>,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.usuarioRepository.imagenes(id).patch(imagen, where);
  }

  @del('/usuarios/{id}/imagens', {
    responses: {
      '200': {
        description: 'Usuario.Imagen DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.usuarioRepository.imagenes(id).delete(where);
  }
}
