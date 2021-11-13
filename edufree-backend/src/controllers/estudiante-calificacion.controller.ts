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
  Calificacion,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteCalificacionController {
  constructor(
    @repository(EstudianteRepository) protected estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/calificacions', {
    responses: {
      '200': {
        description: 'Array of Estudiante has many Calificacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Calificacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Calificacion>,
  ): Promise<Calificacion[]> {
    return this.estudianteRepository.Calififaciones(id).find(filter);
  }

  @post('/estudiantes/{id}/calificacions', {
    responses: {
      '200': {
        description: 'Estudiante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Calificacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estudiante.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Calificacion, {
            title: 'NewCalificacionInEstudiante',
            exclude: ['Id'],
            optional: ['estudianteId']
          }),
        },
      },
    }) calificacion: Omit<Calificacion, 'Id'>,
  ): Promise<Calificacion> {
    return this.estudianteRepository.Calififaciones(id).create(calificacion);
  }

  @patch('/estudiantes/{id}/calificacions', {
    responses: {
      '200': {
        description: 'Estudiante.Calificacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Calificacion, {partial: true}),
        },
      },
    })
    calificacion: Partial<Calificacion>,
    @param.query.object('where', getWhereSchemaFor(Calificacion)) where?: Where<Calificacion>,
  ): Promise<Count> {
    return this.estudianteRepository.Calififaciones(id).patch(calificacion, where);
  }

  @del('/estudiantes/{id}/calificacions', {
    responses: {
      '200': {
        description: 'Estudiante.Calificacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Calificacion)) where?: Where<Calificacion>,
  ): Promise<Count> {
    return this.estudianteRepository.Calififaciones(id).delete(where);
  }
}
