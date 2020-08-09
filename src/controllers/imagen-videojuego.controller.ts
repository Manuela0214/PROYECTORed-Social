import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Imagen,
  Videojuego,
} from '../models';
import {ImagenRepository} from '../repositories';

export class ImagenVideojuegoController {
  constructor(
    @repository(ImagenRepository)
    public imagenRepository: ImagenRepository,
  ) { }

  @get('/imagens/{id}/videojuego', {
    responses: {
      '200': {
        description: 'Videojuego belonging to Imagen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Videojuego)},
          },
        },
      },
    },
  })
  async getVideojuego(
    @param.path.string('id') id: typeof Imagen.prototype.id,
  ): Promise<Videojuego> {
    return this.imagenRepository.videojuego(id);
  }
}
