import { Recruitment } from 'src/recruitments/entities/recruitment.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SurveyMetadata {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Recruitment, (recruitment) => recruitment.uuid)
  recruitment: Recruitment;
}
