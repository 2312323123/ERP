import { Recruitment } from 'src/recruitments/entities/recruitment.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class EvaluationSchema {
  @PrimaryColumn()
  recruitment_uuid: string;

  @ManyToOne(() => Recruitment, (recruitment) => recruitment.uuid)
  @JoinColumn({ name: 'recruitment_uuid' })
  recruitment_hehe: Recruitment;

  @PrimaryColumn()
  order: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  weight: number;
}
