import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProgramaAcademico,
  Administrador,
} from '../models';
import {ProgramaAcademicoRepository} from '../repositories';

export class ProgramaAcademicoAdministradorController {
  constructor(
    @repository(ProgramaAcademicoRepository)
    public programaAcademicoRepository: ProgramaAcademicoRepository,
  ) { }

  @get('/programa-academicos/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to ProgramaAcademico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof ProgramaAcademico.prototype.Id,
  ): Promise<Administrador> {
    return this.programaAcademicoRepository.administrador(id);
  }
}
