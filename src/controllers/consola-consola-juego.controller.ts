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
  Consola,
  ConsolaJuego,
} from '../models';
import {ConsolaRepository} from '../repositories';

export class ConsolaConsolaJuegoController {
  constructor(
    @repository(ConsolaRepository) protected consolaRepository: ConsolaRepository,
  ) { }

  @get('/consolas/{id}/consola-juegos', {
    responses: {
      '200': {
        description: 'Array of Consola has many ConsolaJuego',
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
    return this.consolaRepository.consolaJuegos(id).find(filter);
  }

  @post('/consolas/{id}/consola-juegos', {
    responses: {
      '200': {
        description: 'Consola model instance',
        content: {'application/json': {schema: getModelSchemaRef(ConsolaJuego)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Consola.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsolaJuego, {
            title: 'NewConsolaJuegoInConsola',
            exclude: ['id'],
            optional: ['consolaId']
          }),
        },
      },
    }) consolaJuego: Omit<ConsolaJuego, 'id'>,
  ): Promise<ConsolaJuego> {
    return this.consolaRepository.consolaJuegos(id).create(consolaJuego);
  }

  @patch('/consolas/{id}/consola-juegos', {
    responses: {
      '200': {
        description: 'Consola.ConsolaJuego PATCH success count',
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
    return this.consolaRepository.consolaJuegos(id).patch(consolaJuego, where);
  }

  @del('/consolas/{id}/consola-juegos', {
    responses: {
      '200': {
        description: 'Consola.ConsolaJuego DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ConsolaJuego)) where?: Where<ConsolaJuego>,
  ): Promise<Count> {
    return this.consolaRepository.consolaJuegos(id).delete(where);
  }
}
