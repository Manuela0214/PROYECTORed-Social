import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Amistad, AmistadRelations, Usuario} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class AmistadRepository extends DefaultCrudRepository<
  Amistad,
  typeof Amistad.prototype.id,
  AmistadRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Amistad.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Amistad, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
//ola