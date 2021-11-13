import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, ProgramaAcademico} from '../models';
import {ProgramaAcademicoRepository} from './programa-academico.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.Id,
  AdministradorRelations
> {

  public readonly programaAcademicos: HasManyRepositoryFactory<ProgramaAcademico, typeof Administrador.prototype.Id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('ProgramaAcademicoRepository') protected programaAcademicoRepositoryGetter: Getter<ProgramaAcademicoRepository>,
  ) {
    super(Administrador, dataSource);
    this.programaAcademicos = this.createHasManyRepositoryFactoryFor('programaAcademicos', programaAcademicoRepositoryGetter,);
    this.registerInclusionResolver('programaAcademicos', this.programaAcademicos.inclusionResolver);
  }
}
