import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Mark {
  // First part of composite primary key, and foreign key reference to SurveyMetadata
  @PrimaryColumn()
  survey_uuid: string;

  @ManyToOne(() => SurveyMetadata, (survey_metadata) => survey_metadata.uuid)
  @JoinColumn({ name: 'survey_uuid' })
  survey_metadata: SurveyMetadata;

  // Second part of composite primary key, evaluator_id from another service
  @PrimaryColumn()
  evaluator_id: string;

  // Third part of composite primary key
  @PrimaryColumn()
  order: number;

  @Column({ nullable: false })
  number_value: number;
}
