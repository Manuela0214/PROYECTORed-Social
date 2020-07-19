import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConsolaJuego, ConsolaJuegoRelations, Consola, Videojuego} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ConsolaRepository} from './consola.repository';
import {VideojuegoRepository} from './videojuego.repository';

export class ConsolaJuegoRepository extends DefaultCrudRepository<
  ConsolaJuego,
  typeof ConsolaJuego.prototype.id,
  ConsolaJuegoRelations
> {

  public readonly consola: BelongsToAccessor<Consola, typeof ConsolaJuego.prototype.id>;

  public readonly videojuego: BelongsToAccessor<Videojuego, typeof ConsolaJuego.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ConsolaRepository') protected consolaRepositoryGetter: Getter<ConsolaRepository>, @repository.getter('VideojuegoRepository') protected videojuegoRepositoryGetter: Getter<VideojuegoRepository>,
  ) {
    super(ConsolaJuego, dataSource);
    this.videojuego = this.createBelongsToAccessorFor('videojuego', videojuegoRepositoryGetter,);
    this.registerInclusionResolver('videojuego', this.videojuego.inclusionResolver);
    this.consola = this.createBelongsToAccessorFor('consola', consolaRepositoryGetter,);
    this.registerInclusionResolver('consola', this.consola.inclusionResolver);
  }
}
