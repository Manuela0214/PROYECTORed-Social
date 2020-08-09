import {DefaultCrudRepository} from '@loopback/repository';
import {Publicidad, PublicidadRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PublicidadRepository extends DefaultCrudRepository<
  Publicidad,
  typeof Publicidad.prototype.id,
  PublicidadRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Publicidad, dataSource);
  }
}
