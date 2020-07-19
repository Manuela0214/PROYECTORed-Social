import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ConsolaJuego,
  Videojuego,
} from '../models';
import {ConsolaJuegoRepository} from '../repositories';

export class ConsolaJuegoVideojuegoController {
  constructor(
    @repository(ConsolaJuegoRepository)
    public consolaJuegoRepository: ConsolaJuegoRepository,
  ) { }

  @get('/consola-juegos/{id}/videojuego', {
    responses: {
      '200': {
        description: 'Videojuego belonging to ConsolaJuego',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Videojuego)},
          },
        },
      },
    },
  })
  async getVideojuego(
    @param.path.string('id') id: typeof ConsolaJuego.prototype.id,
  ): Promise<Videojuego> {
    return this.consolaJuegoRepository.videojuego(id);
  }
}
