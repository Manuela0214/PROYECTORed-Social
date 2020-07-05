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
  Categoria,
  Videojuego,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaVideojuegoController {
  constructor(
    @repository(CategoriaRepository) protected categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/videojuego', {
    responses: {
      '200': {
        description: 'Categoria has one Videojuego',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Videojuego),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Videojuego>,
  ): Promise<Videojuego> {
    return this.categoriaRepository.videojuego(id).get(filter);
  }

  @post('/categorias/{id}/videojuego', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Videojuego)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Categoria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Videojuego, {
            title: 'NewVideojuegoInCategoria',
            exclude: ['id'],
            optional: ['categoriaId']
          }),
        },
      },
    }) videojuego: Omit<Videojuego, 'id'>,
  ): Promise<Videojuego> {
    return this.categoriaRepository.videojuego(id).create(videojuego);
  }

  @patch('/categorias/{id}/videojuego', {
    responses: {
      '200': {
        description: 'Categoria.Videojuego PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Videojuego, {partial: true}),
        },
      },
    })
    videojuego: Partial<Videojuego>,
    @param.query.object('where', getWhereSchemaFor(Videojuego)) where?: Where<Videojuego>,
  ): Promise<Count> {
    return this.categoriaRepository.videojuego(id).patch(videojuego, where);
  }

  @del('/categorias/{id}/videojuego', {
    responses: {
      '200': {
        description: 'Categoria.Videojuego DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Videojuego)) where?: Where<Videojuego>,
  ): Promise<Count> {
    return this.categoriaRepository.videojuego(id).delete(where);
  }
}
//hola