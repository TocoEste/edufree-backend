import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Docente, DocenteRelations, Grupo} from '../models';
import {GrupoRepository} from './grupo.repository';

export class DocenteRepository extends DefaultCrudRepository<
  Docente,
  typeof Docente.prototype.Id,
  DocenteRelations
> {

  public readonly grupos: HasManyRepositoryFactory<Grupo, typeof Docente.prototype.Id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(Docente, dataSource);
    this.grupos = this.createHasManyRepositoryFactoryFor('grupos', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
  }
}
