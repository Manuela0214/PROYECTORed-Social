import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Imagen,
  Videojuego
} from '../models';
import {ImagenRepository} from '../repositories';

export class ImagenVideojuegoController {
  constructor(
    @repository(ImagenRepository)
    public imagenRepository: ImagenRepository,
  ) {}

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



  @authenticate('TokenAdminStrategy')
  @del('/videojuego-imagen/{id}', {
    responses: {
      '204': {
        description: 'Videojuego imagen DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') imageId: string): Promise<void> {
    await this.imagenRepository.deleteById(imageId);
  }

}
