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
  Consola,
} from '../models';
import {ConsolaJuegoRepository} from '../repositories';

export class ConsolaJuegoConsolaController {
  constructor(
    @repository(ConsolaJuegoRepository)
    public consolaJuegoRepository: ConsolaJuegoRepository,
  ) { }

  @get('/consola-juegos/{id}/consola', {
    responses: {
      '200': {
        description: 'Consola belonging to ConsolaJuego',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Consola)},
          },
        },
      },
    },
  })
  async getConsola(
    @param.path.string('id') id: typeof ConsolaJuego.prototype.id,
  ): Promise<Consola> {
    return this.consolaJuegoRepository.consola(id);
  }
}
