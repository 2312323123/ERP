import { Recruitment } from 'src/recruitments/entities/recruitment.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class FieldsHiddenForSurveyEvaluator {
  // First part of composite primary key, recruitment_uuid (as a foreign key and primary column)
  @PrimaryColumn() // Mark as part of the composite primary key
  recruitment_uuid: string;

  @ManyToOne(() => Recruitment, (recruitment) => recruitment.uuid, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recruitment_uuid' }) // Specify the foreign key column name
  recruitment: Recruitment;

  // Second part of composite primary key
  @PrimaryColumn() // Mark as part of the composite primary key
  field: string;
}
