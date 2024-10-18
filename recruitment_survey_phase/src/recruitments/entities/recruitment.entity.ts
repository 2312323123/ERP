import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Recruitment {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  start_date_time: Date;

  @Column({ length: 126 })
  survey_sending_secret: string;

  @Column({ type: 'text' })
  grading_instruction: string;

  @Column()
  field_to_distinct_the_survey: string;
}
