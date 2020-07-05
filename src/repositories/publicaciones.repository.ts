import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Publicaciones, PublicacionesRelations, Etiquetado} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EtiquetadoRepository} from './etiquetado.repository';

export class PublicacionesRepository extends DefaultCrudRepository<
  Publicaciones,
  typeof Publicaciones.prototype.id_publicacion,
  PublicacionesRelations
> {

  public readonly etiquetados: HasManyRepositoryFactory<Etiquetado, typeof Publicaciones.prototype.id_publicacion>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EtiquetadoRepository') protected etiquetadoRepositoryGetter: Getter<EtiquetadoRepository>,
  ) {
    super(Publicaciones, dataSource);
    this.etiquetados = this.createHasManyRepositoryFactoryFor('etiquetados', etiquetadoRepositoryGetter,);
    this.registerInclusionResolver('etiquetados', this.etiquetados.inclusionResolver);
  }
}
//ola