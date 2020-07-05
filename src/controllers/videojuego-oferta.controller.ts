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
  Oferta,
} from '../models';
import {VideojuegoRepository} from '../repositories';

export class VideojuegoOfertaController {
  constructor(
    @repository(VideojuegoRepository) protected videojuegoRepository: VideojuegoRepository,
  ) { }

  @get('/videojuegos/{id}/ofertas', {
    responses: {
      '200': {
        description: 'Array of Videojuego has many Oferta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Oferta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Oferta>,
  ): Promise<Oferta[]> {
    return this.videojuegoRepository.ofertas(id).find(filter);
  }

  @post('/videojuegos/{id}/ofertas', {
    responses: {
      '200': {
        description: 'Videojuego model instance',
        content: {'application/json': {schema: getModelSchemaRef(Oferta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Videojuego.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oferta, {
            title: 'NewOfertaInVideojuego',
            exclude: ['id'],
            optional: ['idVideojuego']
          }),
        },
      },
    }) oferta: Omit<Oferta, 'id'>,
  ): Promise<Oferta> {
    return this.videojuegoRepository.ofertas(id).create(oferta);
  }

  @patch('/videojuegos/{id}/ofertas', {
    responses: {
      '200': {
        description: 'Videojuego.Oferta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oferta, {partial: true}),
        },
      },
    })
    oferta: Partial<Oferta>,
    @param.query.object('where', getWhereSchemaFor(Oferta)) where?: Where<Oferta>,
  ): Promise<Count> {
    return this.videojuegoRepository.ofertas(id).patch(oferta, where);
  }

  @del('/videojuegos/{id}/ofertas', {
    responses: {
      '200': {
        description: 'Videojuego.Oferta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Oferta)) where?: Where<Oferta>,
  ): Promise<Count> {
    return this.videojuegoRepository.ofertas(id).delete(where);
  }
}
//ola