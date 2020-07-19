import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Mensajes} from '../models';
import {MensajesRepository} from '../repositories';

export class MensajeController {
  constructor(
    @repository(MensajesRepository)
    public mensajesRepository: MensajesRepository,
  ) {}

  @post('/mensaje', {
    responses: {
      '200': {
        description: 'Mensajes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mensajes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensajes, {
            title: 'NewMensajes',
            exclude: ['id'],
          }),
        },
      },
    })
    mensajes: Omit<Mensajes, 'id'>,
  ): Promise<Mensajes> {
    return this.mensajesRepository.create(mensajes);
  }


  @get('/mensaje/count', {
    responses: {
      '200': {
        description: 'Mensajes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Mensajes) where?: Where<Mensajes>,
  ): Promise<Count> {
    return this.mensajesRepository.count(where);
  }

  @get('/mensaje', {
    responses: {
      '200': {
        description: 'Array of Mensajes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Mensajes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Mensajes) filter?: Filter<Mensajes>,
  ): Promise<Mensajes[]> {
    return this.mensajesRepository.find(filter);
  }

  @patch('/mensaje', {
    responses: {
      '200': {
        description: 'Mensajes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensajes, {partial: true}),
        },
      },
    })
    mensajes: Mensajes,
    @param.where(Mensajes) where?: Where<Mensajes>,
  ): Promise<Count> {
    return this.mensajesRepository.updateAll(mensajes, where);
  }

  @get('/mensaje/{id}', {
    responses: {
      '200': {
        description: 'Mensajes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mensajes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mensajes, {exclude: 'where'}) filter?: FilterExcludingWhere<Mensajes>
  ): Promise<Mensajes> {
    return this.mensajesRepository.findById(id, filter);
  }

  @patch('/mensaje/{id}', {
    responses: {
      '204': {
        description: 'Mensajes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensajes, {partial: true}),
        },
      },
    })
    mensajes: Mensajes,
  ): Promise<void> {
    await this.mensajesRepository.updateById(id, mensajes);
  }

  @put('/mensaje/{id}', {
    responses: {
      '204': {
        description: 'Mensajes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mensajes: Mensajes,
  ): Promise<void> {
    await this.mensajesRepository.replaceById(id, mensajes);
  }

  @del('/mensaje/{id}', {
    responses: {
      '204': {
        description: 'Mensajes DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mensajesRepository.deleteById(id);
  }
}
