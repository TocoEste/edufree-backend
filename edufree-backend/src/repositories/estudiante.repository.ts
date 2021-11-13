import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Estudiante, EstudianteRelations, Calificacion, Grupo, EstudiantesGrupos} from '../models';
import {CalificacionRepository} from './calificacion.repository';
import {EstudiantesGruposRepository} from './estudiantes-grupos.repository';
import {GrupoRepository} from './grupo.repository';

export class EstudianteRepository extends DefaultCrudRepository<
  Estudiante,
  typeof Estudiante.prototype.Id,
  EstudianteRelations
> {

  public readonly Calififaciones: HasManyRepositoryFactory<Calificacion, typeof Estudiante.prototype.Id>;

  public readonly grupos: HasManyThroughRepositoryFactory<Grupo, typeof Grupo.prototype.Id,
          EstudiantesGrupos,
          typeof Estudiante.prototype.Id
        >;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('CalificacionRepository') protected calificacionRepositoryGetter: Getter<CalificacionRepository>, @repository.getter('EstudiantesGruposRepository') protected estudiantesGruposRepositoryGetter: Getter<EstudiantesGruposRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(Estudiante, dataSource);
    this.grupos = this.createHasManyThroughRepositoryFactoryFor('grupos', grupoRepositoryGetter, estudiantesGruposRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
    this.Calififaciones = this.createHasManyRepositoryFactoryFor('Calififaciones', calificacionRepositoryGetter,);
    this.registerInclusionResolver('Calififaciones', this.Calififaciones.inclusionResolver);
  }
}
