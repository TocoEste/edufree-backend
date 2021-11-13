import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Calificacion, CalificacionRelations, Estudiante} from '../models';
import {EstudianteRepository} from './estudiante.repository';

export class CalificacionRepository extends DefaultCrudRepository<
  Calificacion,
  typeof Calificacion.prototype.Id,
  CalificacionRelations
> {

  public readonly estudiante: BelongsToAccessor<Estudiante, typeof Calificacion.prototype.Id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Calificacion, dataSource);
    this.estudiante = this.createBelongsToAccessorFor('estudiante', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiante', this.estudiante.inclusionResolver);
  }
}
