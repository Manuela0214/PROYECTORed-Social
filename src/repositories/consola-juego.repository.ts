import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConsolaJuego, ConsolaJuegoRelations, Videojuego, Consola} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {VideojuegoRepository} from './videojuego.repository';
import {ConsolaRepository} from './consola.repository';

export class ConsolaJuegoRepository extends DefaultCrudRepository<
  ConsolaJuego,
  typeof ConsolaJuego.prototype.id,
  ConsolaJuegoRelations
> {

  public readonly videojuego: BelongsToAccessor<Videojuego, typeof ConsolaJuego.prototype.id>;

  public readonly consola: BelongsToAccessor<Consola, typeof ConsolaJuego.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VideojuegoRepository') protected videojuegoRepositoryGetter: Getter<VideojuegoRepository>, @repository.getter('ConsolaRepository') protected consolaRepositoryGetter: Getter<ConsolaRepository>,
  ) {
    super(ConsolaJuego, dataSource);
    this.consola = this.createBelongsToAccessorFor('consola', consolaRepositoryGetter,);
    this.registerInclusionResolver('consola', this.consola.inclusionResolver);
    this.videojuego = this.createBelongsToAccessorFor('videojuego', videojuegoRepositoryGetter,);
    this.registerInclusionResolver('videojuego', this.videojuego.inclusionResolver);
  }
}
//ola