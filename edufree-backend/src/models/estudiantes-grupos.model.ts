import {Entity, model, property} from '@loopback/repository';

@model()
export class EstudiantesGrupos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
  })
  estudianteId?: string;

  @property({
    type: 'string',
  })
  grupoId?: string;

  constructor(data?: Partial<EstudiantesGrupos>) {
    super(data);
  }
}

export interface EstudiantesGruposRelations {
  // describe navigational properties here
}

export type EstudiantesGruposWithRelations = EstudiantesGrupos & EstudiantesGruposRelations;
