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
import {Publicidad} from '../models';
import {PublicidadRepository} from '../repositories';

export class PublicidadController {
  constructor(
    @repository(PublicidadRepository)
    public publicidadRepository : PublicidadRepository,
  ) {}

  @post('/publicidad', {
    responses: {
      '200': {
        description: 'Publicidad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publicidad)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicidad, {
            title: 'NewPublicidad',
            exclude: ['id'],
          }),
        },
      },
    })
    publicidad: Omit<Publicidad, 'id'>,
  ): Promise<Publicidad> {
    return this.publicidadRepository.create(publicidad);
  }

  @get('/publicidad/count', {
    responses: {
      '200': {
        description: 'Publicidad model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Publicidad) where?: Where<Publicidad>,
  ): Promise<Count> {
    return this.publicidadRepository.count(where);
  }

  @get('/publicidad', {
    responses: {
      '200': {
        description: 'Array of Publicidad model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Publicidad, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Publicidad) filter?: Filter<Publicidad>,
  ): Promise<Publicidad[]> {
    return this.publicidadRepository.find(filter);
  }

  @patch('/publicidad', {
    responses: {
      '200': {
        description: 'Publicidad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicidad, {partial: true}),
        },
      },
    })
    publicidad: Publicidad,
    @param.where(Publicidad) where?: Where<Publicidad>,
  ): Promise<Count> {
    return this.publicidadRepository.updateAll(publicidad, where);
  }

  @get('/publicidad/{id}', {
    responses: {
      '200': {
        description: 'Publicidad model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Publicidad, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Publicidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Publicidad>
  ): Promise<Publicidad> {
    return this.publicidadRepository.findById(id, filter);
  }

  @patch('/publicidad/{id}', {
    responses: {
      '204': {
        description: 'Publicidad PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicidad, {partial: true}),
        },
      },
    })
    publicidad: Publicidad,
  ): Promise<void> {
    await this.publicidadRepository.updateById(id, publicidad);
  }

  @put('/publicidad/{id}', {
    responses: {
      '204': {
        description: 'Publicidad PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() publicidad: Publicidad,
  ): Promise<void> {
    await this.publicidadRepository.replaceById(id, publicidad);
  }

  @del('/publicidad/{id}', {
    responses: {
      '204': {
        description: 'Publicidad DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.publicidadRepository.deleteById(id);
  }
}
