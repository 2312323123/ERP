import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CanEvaluateSurvey {
  @PrimaryColumn({ unique: true })
  can_evaluate_surveys: boolean;
}
