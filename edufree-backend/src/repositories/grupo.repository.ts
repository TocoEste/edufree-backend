import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Grupo, GrupoRelations, Docente, Asignatura} from '../models';
import {DocenteRepository} from './docente.repository';
import {AsignaturaRepository} from './asignatura.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.Id,
  GrupoRelations
> {

  public readonly docente: BelongsToAccessor<Docente, typeof Grupo.prototype.Id>;

  public readonly asignatura: BelongsToAccessor<Asignatura, typeof Grupo.prototype.Id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('DocenteRepository') protected docenteRepositoryGetter: Getter<DocenteRepository>, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>,
  ) {
    super(Grupo, dataSource);
    this.asignatura = this.createBelongsToAccessorFor('asignatura', asignaturaRepositoryGetter,);
    this.registerInclusionResolver('asignatura', this.asignatura.inclusionResolver);
    this.docente = this.createBelongsToAccessorFor('docente', docenteRepositoryGetter,);
    this.registerInclusionResolver('docente', this.docente.inclusionResolver);
  }
}
