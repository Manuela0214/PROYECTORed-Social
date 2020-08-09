import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Imagen, ImagenRelations, Videojuego} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {VideojuegoRepository} from './videojuego.repository';

export class ImagenRepository extends DefaultCrudRepository<
  Imagen,
  typeof Imagen.prototype.id,
  ImagenRelations
> {

  public readonly videojuego: BelongsToAccessor<Videojuego, typeof Imagen.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VideojuegoRepository') protected videojuegoRepositoryGetter: Getter<VideojuegoRepository>,
  ) {
    super(Imagen, dataSource);
    this.videojuego = this.createBelongsToAccessorFor('videojuego', videojuegoRepositoryGetter,);
    this.registerInclusionResolver('videojuego', this.videojuego.inclusionResolver);
  }
}
