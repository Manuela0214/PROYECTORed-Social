import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Oferta,
  Videojuego,
} from '../models';
import {OfertaRepository} from '../repositories';

export class OfertaVideojuegoController {
  constructor(
    @repository(OfertaRepository)
    public ofertaRepository: OfertaRepository,
  ) { }

  @get('/ofertas/{id}/videojuego', {
    responses: {
      '200': {
        description: 'Videojuego belonging to Oferta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Videojuego)},
          },
        },
      },
    },
  })
  async getVideojuego(
    @param.path.string('id') id: typeof Oferta.prototype.id,
  ): Promise<Videojuego> {
    return this.ofertaRepository.videojuego(id);
  }
}
//olaa
