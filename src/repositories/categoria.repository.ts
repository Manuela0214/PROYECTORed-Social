import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Categoria, CategoriaRelations, Videojuego} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {VideojuegoRepository} from './videojuego.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id,
  CategoriaRelations
> {

  public readonly videojuego: HasOneRepositoryFactory<Videojuego, typeof Categoria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VideojuegoRepository') protected videojuegoRepositoryGetter: Getter<VideojuegoRepository>,
  ) {
    super(Categoria, dataSource);
    this.videojuego = this.createHasOneRepositoryFactoryFor('videojuego', videojuegoRepositoryGetter);
    this.registerInclusionResolver('videojuego', this.videojuego.inclusionResolver);
  }
}
//ola