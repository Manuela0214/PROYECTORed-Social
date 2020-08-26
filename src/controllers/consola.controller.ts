import {authenticate} from '@loopback/authentication';
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
  getModelSchemaRef,










  HttpErrors, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Consola} from '../models';
import {ConsolaRepository} from '../repositories';

export class ConsolaController {
  constructor(
    @repository(ConsolaRepository)
    public consolaRepository: ConsolaRepository,
  ) {}


  @authenticate('TokenAdminStrategy')
  @post('/consola', {
    responses: {
      '200': {
        description: 'Consola model instance',
        content: {'application/json': {schema: getModelSchemaRef(Consola)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consola, {
            title: 'NewConsola',
            exclude: ['id'],
          }),
        },
      },
    })
    consola: Omit<Consola, 'id'>,
  ): Promise<Consola> {
    let currentConsola = await this.consolaRepository.findOne({where: {nombre: consola.nombre}});
    if (currentConsola) {
      throw new HttpErrors[401]("la consola ya existe");
    } else {

      return this.consolaRepository.create(consola);
    }
  }

  @get('/consola/count', {
    responses: {
      '200': {
        description: 'Consola model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Consola) where?: Where<Consola>,
  ): Promise<Count> {
    return this.consolaRepository.count(where);
  }

  @get('/consola', {
    responses: {
      '200': {
        description: 'Array of Consola model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Consola, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Consola) filter?: Filter<Consola>,
  ): Promise<Consola[]> {
    return this.consolaRepository.find(filter);
  }
  @authenticate('TokenAdminStrategy')
  @patch('/consola', {
    responses: {
      '200': {
        description: 'Consola PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consola, {partial: true}),
        },
      },
    })
    consola: Consola,
    @param.where(Consola) where?: Where<Consola>,
  ): Promise<Count> {
    return this.consolaRepository.updateAll(consola, where);
  }

  @get('/consola/{id}', {
    responses: {
      '200': {
        description: 'Consola model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Consola, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Consola, {exclude: 'where'}) filter?: FilterExcludingWhere<Consola>
  ): Promise<Consola> {
    return this.consolaRepository.findById(id, filter);
  }
  @authenticate('TokenAdminStrategy')
  @patch('/consola/{id}', {
    responses: {
      '204': {
        description: 'Consola PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consola, {partial: true}),
        },
      },
    })
    consola: Consola,
  ): Promise<void> {
    await this.consolaRepository.updateById(id, consola);
  }
  @authenticate('TokenAdminStrategy')
  @put('/consola/{id}', {
    responses: {
      '204': {
        description: 'Consola PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() consola: Consola,
  ): Promise<void> {
    await this.consolaRepository.replaceById(id, consola);
  }

  @del('/consola/{id}', {
    responses: {
      '204': {
        description: 'Consola DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.consolaRepository.deleteById(id);
  }
}
