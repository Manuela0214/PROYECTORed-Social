import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Registro, RegistroRelations, Usuario} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class RegistroRepository extends DefaultCrudRepository<
  Registro,
  typeof Registro.prototype.id,
  RegistroRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Registro.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Registro, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
