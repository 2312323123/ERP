import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class InterviewsSetting {
  @PrimaryColumn({ unique: true })
  field_to_distinct_the_survey_2: string;
}
