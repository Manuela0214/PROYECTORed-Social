import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Publicaciones} from '../models';
import {PublicacionesRepository} from '../repositories';

export class PublicacionController {
  constructor(
    @repository(PublicacionesRepository)
    public publicacionesRepository : PublicacionesRepository,
  ) {}

  @post('/publicacion', {
    responses: {
      '200': {
        description: 'Publicaciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publicaciones)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicaciones, {
            title: 'NewPublicaciones',
            exclude: ['id'],
          }),
        },
      },
    })
    publicaciones: Omit<Publicaciones, 'id'>,
  ): Promise<Publicaciones> {
    return this.publicacionesRepository.create(publicaciones);
  }

  @get('/publicacion/count', {
    responses: {
      '200': {
        description: 'Publicaciones model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Publicaciones) where?: Where<Publicaciones>,
  ): Promise<Count> {
    return this.publicacionesRepository.count(where);
  }

  @get('/publicacion', {
    responses: {
      '200': {
        description: 'Array of Publicaciones model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Publicaciones, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Publicaciones) filter?: Filter<Publicaciones>,
  ): Promise<Publicaciones[]> {
    return this.publicacionesRepository.find(filter);
  }

  @patch('/publicacion', {
    responses: {
      '200': {
        description: 'Publicaciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicaciones, {partial: true}),
        },
      },
    })
    publicaciones: Publicaciones,
    @param.where(Publicaciones) where?: Where<Publicaciones>,
  ): Promise<Count> {
    return this.publicacionesRepository.updateAll(publicaciones, where);
  }

  @get('/publicacion/{id}', {
    responses: {
      '200': {
        description: 'Publicaciones model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Publicaciones, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Publicaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Publicaciones>
  ): Promise<Publicaciones> {
    return this.publicacionesRepository.findById(id, filter);
  }

  @patch('/publicacion/{id}', {
    responses: {
      '204': {
        description: 'Publicaciones PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicaciones, {partial: true}),
        },
      },
    })
    publicaciones: Publicaciones,
  ): Promise<void> {
    await this.publicacionesRepository.updateById(id, publicaciones);
  }

  @put('/publicacion/{id}', {
    responses: {
      '204': {
        description: 'Publicaciones PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() publicaciones: Publicaciones,
  ): Promise<void> {
    await this.publicacionesRepository.replaceById(id, publicaciones);
  }

  @del('/publicacion/{id}', {
    responses: {
      '204': {
        description: 'Publicaciones DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.publicacionesRepository.deleteById(id);
  }
}
