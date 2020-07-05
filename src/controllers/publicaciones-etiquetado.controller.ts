import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {Etiquetado, Publicaciones} from '../models';
import {PublicacionesRepository} from '../repositories';

export class PublicacionesEtiquetadoController {
  constructor(
    @repository(PublicacionesRepository) protected publicacionesRepository: PublicacionesRepository,
  ) {}

  @get('/publicaciones/{id}/etiquetados', {
    responses: {
      '200': {
        description: 'Array of Publicaciones has many Etiquetado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Etiquetado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Etiquetado>,
  ): Promise<Etiquetado[]> {
    return this.publicacionesRepository.etiquetados(id).find(filter);
  }

  @post('/publicaciones/{id}/etiquetados', {
    responses: {
      '200': {
        description: 'Publicaciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Etiquetado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Publicaciones.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Etiquetado, {
            title: 'NewEtiquetadoInPublicaciones',
            exclude: ['id'],
            optional: ['publicacionesId']
          }),
        },
      },
    }) etiquetado: Omit<Etiquetado, 'id'>,
  ): Promise<Etiquetado> {
    return this.publicacionesRepository.etiquetados(id).create(etiquetado);
  }

  @patch('/publicaciones/{id}/etiquetados', {
    responses: {
      '200': {
        description: 'Publicaciones.Etiquetado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Etiquetado, {partial: true}),
        },
      },
    })
    etiquetado: Partial<Etiquetado>,
    @param.query.object('where', getWhereSchemaFor(Etiquetado)) where?: Where<Etiquetado>,
  ): Promise<Count> {
    return this.publicacionesRepository.etiquetados(id).patch(etiquetado, where);
  }

  @del('/publicaciones/{id}/etiquetados', {
    responses: {
      '200': {
        description: 'Publicaciones.Etiquetado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Etiquetado)) where?: Where<Etiquetado>,
  ): Promise<Count> {
    return this.publicacionesRepository.etiquetados(id).delete(where);
  }
}
//ola
