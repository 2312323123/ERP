import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AcceptSurvey {
  @PrimaryColumn()
  accepts_surveys: boolean;
}
