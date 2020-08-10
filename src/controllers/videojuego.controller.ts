import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Videojuego} from '../models';
import {VideojuegoRepository} from '../repositories';

export class VideojuegoController {
  constructor(
    @repository(VideojuegoRepository)
    public videojuegoRepository: VideojuegoRepository,
  ) {}

  @authenticate('TokenAdminStrategy')
  @post('/videojuego', {
    responses: {
      '200': {
        description: 'Videojuego model instance',
        content: {'application/json': {schema: getModelSchemaRef(Videojuego)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Videojuego, {
            title: 'NewVideojuego',
            exclude: ['id'],
          }),
        },
      },
    })
    videojuego: Omit<Videojuego, 'id'>,
  ): Promise<Videojuego> {
    return this.videojuegoRepository.create(videojuego);
  }


  @get('/videojuego/count', {
    responses: {
      '200': {
        description: 'Videojuego model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Videojuego) where?: Where<Videojuego>,
  ): Promise<Count> {
    return this.videojuegoRepository.count(where);
  }

  @get('/videojuego', {
    responses: {
      '200': {
        description: 'Array of Videojuego model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Videojuego, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Videojuego) filter?: Filter<Videojuego>,
  ): Promise<Videojuego[]> {
    return this.videojuegoRepository.find(filter);
  }
  @authenticate('TokenAdminStrategy')
  @patch('/videojuego', {
    responses: {
      '200': {
        description: 'Videojuego PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Videojuego, {partial: true}),
        },
      },
    })
    videojuego: Videojuego,
    @param.where(Videojuego) where?: Where<Videojuego>,
  ): Promise<Count> {
    return this.videojuegoRepository.updateAll(videojuego, where);
  }

  @get('/videojuego/{id}', {
    responses: {
      '200': {
        description: 'Videojuego model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Videojuego, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Videojuego, {exclude: 'where'}) filter?: FilterExcludingWhere<Videojuego>
  ): Promise<Videojuego> {
    return this.videojuegoRepository.findById(id, filter);
  }
  @authenticate('TokenAdminStrategy')
  @patch('/videojuego/{id}', {
    responses: {
      '204': {
        description: 'Videojuego PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Videojuego, {partial: true}),
        },
      },
    })
    videojuego: Videojuego,
  ): Promise<void> {
    await this.videojuegoRepository.updateById(id, videojuego);
  }
  @authenticate('TokenAdminStrategy')
  @put('/videojuego/{id}', {
    responses: {
      '204': {
        description: 'Videojuego PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() videojuego: Videojuego,
  ): Promise<void> {
    await this.videojuegoRepository.replaceById(id, videojuego);
  }
  @authenticate('TokenAdminStrategy')
  @del('/videojuego/{id}', {
    responses: {
      '204': {
        description: 'Videojuego DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.videojuegoRepository.deleteById(id);
  }
}
