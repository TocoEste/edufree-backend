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
Estudiante,
EstudiantesGrupos,
Grupo,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteGrupoController {
  constructor(
    @repository(EstudianteRepository) protected estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of Estudiante has many Grupo through EstudiantesGrupos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Grupo>,
  ): Promise<Grupo[]> {
    return this.estudianteRepository.grupos(id).find(filter);
  }

  @post('/estudiantes/{id}/grupos', {
    responses: {
      '200': {
        description: 'create a Grupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estudiante.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupoInEstudiante',
            exclude: ['Id'],
          }),
        },
      },
    }) grupo: Omit<Grupo, 'Id'>,
  ): Promise<Grupo> {
    return this.estudianteRepository.grupos(id).create(grupo);
  }

  @patch('/estudiantes/{id}/grupos', {
    responses: {
      '200': {
        description: 'Estudiante.Grupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Partial<Grupo>,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.estudianteRepository.grupos(id).patch(grupo, where);
  }

  @del('/estudiantes/{id}/grupos', {
    responses: {
      '200': {
        description: 'Estudiante.Grupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.estudianteRepository.grupos(id).delete(where);
  }
}
