import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Asignatura} from './asignatura.model';
import {Administrador} from './administrador.model';

@model()
export class ProgramaAcademico extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Duracion: string;

  @property({
    type: 'string',
    required: true,
  })
  Modalidad: string;

  @property({
    type: 'string',
    required: true,
  })
  NivelFormacion: string;

  @property({
    type: 'number',
    required: true,
  })
  CreditosAcademicos: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  Pensum: string[];

  @hasMany(() => Asignatura)
  asignaturas: Asignatura[];

  @belongsTo(() => Administrador)
  administradorId: string;

  constructor(data?: Partial<ProgramaAcademico>) {
    super(data);
  }
}

export interface ProgramaAcademicoRelations {
  // describe navigational properties here
}

export type ProgramaAcademicoWithRelations = ProgramaAcademico & ProgramaAcademicoRelations;
