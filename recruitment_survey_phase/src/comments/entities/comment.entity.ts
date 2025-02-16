import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryColumn()
  survey_uuid: string;

  @ManyToOne(() => SurveyMetadata, (survey_metadata) => survey_metadata.uuid)
  @JoinColumn({ name: 'survey_uuid' })
  survey_metadata: SurveyMetadata;

  @PrimaryColumn()
  evaluator_id: string;

  @Column({ nullable: true })
  text_value: string;

  // to get previous/next evaluation done by the user
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  // the column to get when the evaluation was done
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
