import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Oferta, OfertaRelations, Videojuego} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {VideojuegoRepository} from './videojuego.repository';

export class OfertaRepository extends DefaultCrudRepository<
  Oferta,
  typeof Oferta.prototype.id,
  OfertaRelations
> {

  public readonly videojuego: BelongsToAccessor<Videojuego, typeof Oferta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VideojuegoRepository') protected videojuegoRepositoryGetter: Getter<VideojuegoRepository>,
  ) {
    super(Oferta, dataSource);
    this.videojuego = this.createBelongsToAccessorFor('videojuego', videojuegoRepositoryGetter,);
    this.registerInclusionResolver('videojuego', this.videojuego.inclusionResolver);
  }
}
//ola