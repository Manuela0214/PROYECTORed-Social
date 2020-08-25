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
  Usuario,
} from '../models';
import {ImagenRepository} from '../repositories';

export class ImagenUsuarioController {
  constructor(
    @repository(ImagenRepository)
    public imagenRepository: ImagenRepository,
  ) { }

  @get('/imagens/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Imagen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Imagen.prototype.id,
  ): Promise<Usuario> {
    return this.imagenRepository.usuario(id);
  }
}
