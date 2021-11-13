import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Calificacion,
  Estudiante,
} from '../models';
import {CalificacionRepository} from '../repositories';

export class CalificacionEstudianteController {
  constructor(
    @repository(CalificacionRepository)
    public calificacionRepository: CalificacionRepository,
  ) { }

  @get('/calificacions/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Estudiante belonging to Calificacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async getEstudiante(
    @param.path.string('id') id: typeof Calificacion.prototype.Id,
  ): Promise<Estudiante> {
    return this.calificacionRepository.estudiante(id);
  }
}
