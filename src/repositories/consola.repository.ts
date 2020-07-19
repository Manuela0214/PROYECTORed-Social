import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Consola, ConsolaRelations, ConsolaJuego} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ConsolaJuegoRepository} from './consola-juego.repository';

export class ConsolaRepository extends DefaultCrudRepository<
  Consola,
  typeof Consola.prototype.id,
  ConsolaRelations
> {

  public readonly consolaJuegos: HasManyRepositoryFactory<ConsolaJuego, typeof Consola.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ConsolaJuegoRepository') protected consolaJuegoRepositoryGetter: Getter<ConsolaJuegoRepository>,
  ) {
    super(Consola, dataSource);
    this.consolaJuegos = this.createHasManyRepositoryFactoryFor('consolaJuegos', consolaJuegoRepositoryGetter,);
    this.registerInclusionResolver('consolaJuegos', this.consolaJuegos.inclusionResolver);
  }
}
