import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Amistad, Mensajes, Etiquetado} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AmistadRepository} from './amistad.repository';
import {MensajesRepository} from './mensajes.repository';
import {EtiquetadoRepository} from './etiquetado.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly amistades: HasManyRepositoryFactory<Amistad, typeof Usuario.prototype.id>;

  public readonly mensajes: HasManyRepositoryFactory<Mensajes, typeof Usuario.prototype.id>;

  public readonly etiquetados: HasManyRepositoryFactory<Etiquetado, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AmistadRepository') protected amistadRepositoryGetter: Getter<AmistadRepository>, @repository.getter('MensajesRepository') protected mensajesRepositoryGetter: Getter<MensajesRepository>, @repository.getter('EtiquetadoRepository') protected etiquetadoRepositoryGetter: Getter<EtiquetadoRepository>,
  ) {
    super(Usuario, dataSource);
    this.etiquetados = this.createHasManyRepositoryFactoryFor('etiquetados', etiquetadoRepositoryGetter,);
    this.registerInclusionResolver('etiquetados', this.etiquetados.inclusionResolver);
    this.mensajes = this.createHasManyRepositoryFactoryFor('mensajes', mensajesRepositoryGetter,);
    this.registerInclusionResolver('mensajes', this.mensajes.inclusionResolver);
    this.amistades = this.createHasManyRepositoryFactoryFor('amistades', amistadRepositoryGetter,);
    this.registerInclusionResolver('amistades', this.amistades.inclusionResolver);
  }
}
//ola