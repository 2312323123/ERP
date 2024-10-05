import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryColumn()
  survey_uuid: string;

  @ManyToOne(() => SurveyMetadata, (survey_metadata) => survey_metadata.uuid)
  @JoinColumn({ name: 'survey_uuid' })
  survey_metadata: SurveyMetadata;

  @PrimaryColumn()
  evaluator_uuid: string;

  @Column({ nullable: true })
  text_value: string;
}
