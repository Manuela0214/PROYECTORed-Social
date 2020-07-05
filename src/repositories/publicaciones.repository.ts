import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Etiquetado, Publicaciones, PublicacionesRelations} from '../models';
import {EtiquetadoRepository} from './etiquetado.repository';

export class PublicacionesRepository extends DefaultCrudRepository<
  Publicaciones,
  typeof Publicaciones.prototype.id,
  PublicacionesRelations
  > {

  public readonly etiquetados: HasManyRepositoryFactory<Etiquetado, typeof Publicaciones.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EtiquetadoRepository') protected etiquetadoRepositoryGetter: Getter<EtiquetadoRepository>,
  ) {
    super(Publicaciones, dataSource);
    this.etiquetados = this.createHasManyRepositoryFactoryFor('etiquetados', etiquetadoRepositoryGetter,);
    this.registerInclusionResolver('etiquetados', this.etiquetados.inclusionResolver);
  }
}
//ola
