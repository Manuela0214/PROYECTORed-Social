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
import {Categoria} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaController {
  constructor(
    @repository(CategoriaRepository)
    public categoriaRepository: CategoriaRepository,
  ) {}

  // Solo puede hacer esta accion un administrador
  @authenticate('TokenAdminStrategy')
  @post('/categoria', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Categoria)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {
            title: 'NewCategoria',
            exclude: ['id'],
          }),
        },
      },
    })
    categoria: Omit<Categoria, 'id'>,
  ): Promise<Categoria> {
    let currentConsola = await this.categoriaRepository.findOne({where: {nombre: categoria.nombre}});
    if (currentConsola) {
      throw new HttpErrors[401]("la consola ya existe");
    } else {

      return this.categoriaRepository.create(categoria);
    }
  }


  @get('/categoria/count', {
    responses: {
      '200': {
        description: 'Categoria model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Categoria) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.categoriaRepository.count(where);
  }

  @get('/categoria', {
    responses: {
      '200': {
        description: 'Array of Categoria model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Categoria, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Categoria) filter?: Filter<Categoria>,
  ): Promise<Categoria[]> {
    return this.categoriaRepository.find(filter);
  }

  @authenticate('TokenAdminStrategy')
  @patch('/categoria', {
    responses: {
      '200': {
        description: 'Categoria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
        },
      },
    })
    categoria: Categoria,
    @param.where(Categoria) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.categoriaRepository.updateAll(categoria, where);
  }

  @get('/categoria/{id}', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Categoria, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Categoria, {exclude: 'where'}) filter?: FilterExcludingWhere<Categoria>
  ): Promise<Categoria> {
    return this.categoriaRepository.findById(id, filter);
  }

  @authenticate('TokenAdminStrategy')
  @patch('/categoria/{id}', {
    responses: {
      '204': {
        description: 'Categoria PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
        },
      },
    })
    categoria: Categoria,
  ): Promise<void> {
    await this.categoriaRepository.updateById(id, categoria);
  }

  @authenticate('TokenAdminStrategy')
  @put('/categoria/{id}', {
    responses: {
      '204': {
        description: 'Categoria PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() categoria: Categoria,
  ): Promise<void> {
    await this.categoriaRepository.replaceById(id, categoria);
  }

  @authenticate('TokenAdminStrategy')
  @del('/categoria/{id}', {
    responses: {
      '204': {
        description: 'Categoria DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.categoriaRepository.deleteById(id);
  }
}
