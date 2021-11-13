import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Calificacion} from '../models';
import {CalificacionRepository} from '../repositories';

export class CalificacionController {
  constructor(
    @repository(CalificacionRepository)
    public calificacionRepository : CalificacionRepository,
  ) {}

  @post('/calificaciones')
  @response(200, {
    description: 'Calificacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Calificacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Calificacion, {
            title: 'NewCalificacion',
            exclude: ['Id'],
          }),
        },
      },
    })
    calificacion: Omit<Calificacion, 'id'>,
  ): Promise<Calificacion> {
    return this.calificacionRepository.create(calificacion);
  }

  @get('/calificaciones/count')
  @response(200, {
    description: 'Calificacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Calificacion) where?: Where<Calificacion>,
  ): Promise<Count> {
    return this.calificacionRepository.count(where);
  }

  @get('/calificaciones')
  @response(200, {
    description: 'Array of Calificacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Calificacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Calificacion) filter?: Filter<Calificacion>,
  ): Promise<Calificacion[]> {
    return this.calificacionRepository.find(filter);
  }

  @patch('/calificaciones')
  @response(200, {
    description: 'Calificacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Calificacion, {partial: true}),
        },
      },
    })
    calificacion: Calificacion,
    @param.where(Calificacion) where?: Where<Calificacion>,
  ): Promise<Count> {
    return this.calificacionRepository.updateAll(calificacion, where);
  }

  @get('/calificaciones/{id}')
  @response(200, {
    description: 'Calificacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Calificacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Calificacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Calificacion>
  ): Promise<Calificacion> {
    return this.calificacionRepository.findById(id, filter);
  }

  @patch('/calificaciones/{id}')
  @response(204, {
    description: 'Calificacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Calificacion, {partial: true}),
        },
      },
    })
    calificacion: Calificacion,
  ): Promise<void> {
    await this.calificacionRepository.updateById(id, calificacion);
  }

  @put('/calificaciones/{id}')
  @response(204, {
    description: 'Calificacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() calificacion: Calificacion,
  ): Promise<void> {
    await this.calificacionRepository.replaceById(id, calificacion);
  }

  @del('/calificaciones/{id}')
  @response(204, {
    description: 'Calificacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.calificacionRepository.deleteById(id);
  }
}
