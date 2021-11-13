import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Administrador,
  ProgramaAcademico,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorProgramaAcademicoController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/programa-academicos', {
    responses: {
      '200': {
        description: 'Array of Administrador has many ProgramaAcademico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProgramaAcademico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProgramaAcademico>,
  ): Promise<ProgramaAcademico[]> {
    return this.administradorRepository.programaAcademicos(id).find(filter);
  }

  @post('/administradors/{id}/programa-academicos', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProgramaAcademico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramaAcademico, {
            title: 'NewProgramaAcademicoInAdministrador',
            exclude: ['Id'],
            optional: ['administradorId']
          }),
        },
      },
    }) programaAcademico: Omit<ProgramaAcademico, 'Id'>,
  ): Promise<ProgramaAcademico> {
    return this.administradorRepository.programaAcademicos(id).create(programaAcademico);
  }

  @patch('/administradors/{id}/programa-academicos', {
    responses: {
      '200': {
        description: 'Administrador.ProgramaAcademico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramaAcademico, {partial: true}),
        },
      },
    })
    programaAcademico: Partial<ProgramaAcademico>,
    @param.query.object('where', getWhereSchemaFor(ProgramaAcademico)) where?: Where<ProgramaAcademico>,
  ): Promise<Count> {
    return this.administradorRepository.programaAcademicos(id).patch(programaAcademico, where);
  }

  @del('/administradors/{id}/programa-academicos', {
    responses: {
      '200': {
        description: 'Administrador.ProgramaAcademico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProgramaAcademico)) where?: Where<ProgramaAcademico>,
  ): Promise<Count> {
    return this.administradorRepository.programaAcademicos(id).delete(where);
  }
}
