import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Estudiante} from './estudiante.model';

@model()
export class Calificacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaCalificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  Comentario: string;

  @property({
    type: 'boolean',
    required: true,
  })
  Aprobado: boolean;

  @property({
    type: 'number',
    required: true,
  })
  Puntaje: number;

  @belongsTo(() => Estudiante)
  estudianteId: string;

  constructor(data?: Partial<Calificacion>) {
    super(data);
  }
}

export interface CalificacionRelations {
  // describe navigational properties here
}

export type CalificacionWithRelations = Calificacion & CalificacionRelations;
