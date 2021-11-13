import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Docente} from './docente.model';
import {Asignatura} from './asignatura.model';

@model()
export class Grupo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'number',
    required: true,
  })
  NumeroGrupo: number;

  @property({
    type: 'date',
    required: true,
  })
  FechaCreacion: string;

  @belongsTo(() => Docente)
  docenteId: string;

  @belongsTo(() => Asignatura)
  asignaturaId: string;

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
