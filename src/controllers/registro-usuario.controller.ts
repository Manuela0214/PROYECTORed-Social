import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Registro,
  Usuario,
} from '../models';
import {RegistroRepository} from '../repositories';

export class RegistroUsuarioController {
  constructor(
    @repository(RegistroRepository)
    public registroRepository: RegistroRepository,
  ) { }

  @get('/registros/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Registro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Registro.prototype.id,
  ): Promise<Usuario> {
    return this.registroRepository.usuario(id);
  }
}
