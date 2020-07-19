import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Categoria, Videojuego} from '../models';
import {VideojuegoRepository} from '../repositories';

export class VideojuegoCategoriaController {
  constructor(
    @repository(VideojuegoRepository)
    public videojuegoRepository: VideojuegoRepository,
  ) {}

  @get('/videojuegos/{id}/categoria', {
    responses: {
      '200': {
        description: 'Categoria belonging to Videojuego',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categoria)},
          },
        },
      },
    },
  })
  async getCategoria(
    @param.path.string('id') id: typeof Videojuego.prototype.id,
  ): Promise<Categoria> {
    return this.videojuegoRepository.categoria(id);
  }
}
