import {DefaultCrudRepository} from '@loopback/repository';
import {Etiquetado, EtiquetadoRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EtiquetadoRepository extends DefaultCrudRepository<
  Etiquetado,
  typeof Etiquetado.prototype.id,
  EtiquetadoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Etiquetado, dataSource);
  }
}
//ola