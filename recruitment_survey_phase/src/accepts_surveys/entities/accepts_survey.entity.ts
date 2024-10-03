import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AcceptsSurvey {
  @PrimaryColumn({ unique: true })
  accepts_surveys: boolean;
}
