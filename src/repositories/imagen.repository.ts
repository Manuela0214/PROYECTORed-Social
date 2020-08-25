import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Imagen, ImagenRelations, Videojuego, Usuario} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {VideojuegoRepository} from './videojuego.repository';
import {UsuarioRepository} from './usuario.repository';

export class ImagenRepository extends DefaultCrudRepository<
  Imagen,
  typeof Imagen.prototype.id,
  ImagenRelations
> {

  public readonly videojuego: BelongsToAccessor<Videojuego, typeof Imagen.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Imagen.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VideojuegoRepository') protected videojuegoRepositoryGetter: Getter<VideojuegoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Imagen, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.videojuego = this.createBelongsToAccessorFor('videojuego', videojuegoRepositoryGetter,);
    this.registerInclusionResolver('videojuego', this.videojuego.inclusionResolver);
  }
}
