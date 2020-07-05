import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Amistad,
  Usuario,
} from '../models';
import {AmistadRepository} from '../repositories';

export class AmistadUsuarioController {
  constructor(
    @repository(AmistadRepository)
    public amistadRepository: AmistadRepository,
  ) { }

  @get('/amistads/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Amistad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Amistad.prototype.id,
  ): Promise<Usuario> {
    return this.amistadRepository.usuario(id);
  }
}
//hola