import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Oferta} from '../models';
import {OfertaRepository} from '../repositories';

export class OfertaController {
  constructor(
    @repository(OfertaRepository)
    public ofertaRepository : OfertaRepository,
  ) {}

  @post('/oferta', {
    responses: {
      '200': {
        description: 'Oferta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Oferta)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oferta, {
            title: 'NewOferta',
            exclude: ['id'],
          }),
        },
      },
    })
    oferta: Omit<Oferta, 'id'>,
  ): Promise<Oferta> {
    return this.ofertaRepository.create(oferta);
  }

  @get('/oferta/count', {
    responses: {
      '200': {
        description: 'Oferta model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Oferta) where?: Where<Oferta>,
  ): Promise<Count> {
    return this.ofertaRepository.count(where);
  }

  @get('/oferta', {
    responses: {
      '200': {
        description: 'Array of Oferta model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Oferta, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Oferta) filter?: Filter<Oferta>,
  ): Promise<Oferta[]> {
    return this.ofertaRepository.find(filter);
  }

  @patch('/oferta', {
    responses: {
      '200': {
        description: 'Oferta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oferta, {partial: true}),
        },
      },
    })
    oferta: Oferta,
    @param.where(Oferta) where?: Where<Oferta>,
  ): Promise<Count> {
    return this.ofertaRepository.updateAll(oferta, where);
  }

  @get('/oferta/{id}', {
    responses: {
      '200': {
        description: 'Oferta model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Oferta, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Oferta, {exclude: 'where'}) filter?: FilterExcludingWhere<Oferta>
  ): Promise<Oferta> {
    return this.ofertaRepository.findById(id, filter);
  }

  @patch('/oferta/{id}', {
    responses: {
      '204': {
        description: 'Oferta PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oferta, {partial: true}),
        },
      },
    })
    oferta: Oferta,
  ): Promise<void> {
    await this.ofertaRepository.updateById(id, oferta);
  }

  @put('/oferta/{id}', {
    responses: {
      '204': {
        description: 'Oferta PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() oferta: Oferta,
  ): Promise<void> {
    await this.ofertaRepository.replaceById(id, oferta);
  }

  @del('/oferta/{id}', {
    responses: {
      '204': {
        description: 'Oferta DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ofertaRepository.deleteById(id);
  }
}
