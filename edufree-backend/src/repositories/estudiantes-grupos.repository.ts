import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {EstudiantesGrupos, EstudiantesGruposRelations} from '../models';

export class EstudiantesGruposRepository extends DefaultCrudRepository<
  EstudiantesGrupos,
  typeof EstudiantesGrupos.prototype.Id,
  EstudiantesGruposRelations
> {
  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource,
  ) {
    super(EstudiantesGrupos, dataSource);
  }
}
