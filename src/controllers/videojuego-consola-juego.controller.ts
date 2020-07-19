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
  Videojuego,
  ConsolaJuego,
} from '../models';
import {VideojuegoRepository} from '../repositories';

export class VideojuegoConsolaJuegoController {
  constructor(
    @repository(VideojuegoRepository) protected videojuegoRepository: VideojuegoRepository,
  ) { }

  @get('/videojuegos/{id}/consola-juegos', {
    responses: {
      '200': {
        description: 'Array of Videojuego has many ConsolaJuego',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ConsolaJuego)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ConsolaJuego>,
  ): Promise<ConsolaJuego[]> {
    return this.videojuegoRepository.consolaJuegos(id).find(filter);
  }

  @post('/videojuegos/{id}/consola-juegos', {
    responses: {
      '200': {
        description: 'Videojuego model instance',
        content: {'application/json': {schema: getModelSchemaRef(ConsolaJuego)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Videojuego.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsolaJuego, {
            title: 'NewConsolaJuegoInVideojuego',
            exclude: ['id'],
            optional: ['videojuegoId']
          }),
        },
      },
    }) consolaJuego: Omit<ConsolaJuego, 'id'>,
  ): Promise<ConsolaJuego> {
    return this.videojuegoRepository.consolaJuegos(id).create(consolaJuego);
  }

  @patch('/videojuegos/{id}/consola-juegos', {
    responses: {
      '200': {
        description: 'Videojuego.ConsolaJuego PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsolaJuego, {partial: true}),
        },
      },
    })
    consolaJuego: Partial<ConsolaJuego>,
    @param.query.object('where', getWhereSchemaFor(ConsolaJuego)) where?: Where<ConsolaJuego>,
  ): Promise<Count> {
    return this.videojuegoRepository.consolaJuegos(id).patch(consolaJuego, where);
  }

  @del('/videojuegos/{id}/consola-juegos', {
    responses: {
      '200': {
        description: 'Videojuego.ConsolaJuego DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ConsolaJuego)) where?: Where<ConsolaJuego>,
  ): Promise<Count> {
    return this.videojuegoRepository.consolaJuegos(id).delete(where);
  }
}
