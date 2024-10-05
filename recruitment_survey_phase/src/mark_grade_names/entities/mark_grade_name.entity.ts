import { Recruitment } from 'src/recruitments/entities/recruitment.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class MarkGradeName {
  @PrimaryColumn()
  recruitment_uuid: string;

  @OneToOne(() => Recruitment, (recruitment) => recruitment.uuid)
  @JoinColumn({ name: 'recruitment_uuid' })
  recruitment: Recruitment;

  @Column()
  grade_1_of_5: string;

  @Column()
  grade_2_of_5: string;

  @Column()
  grade_3_of_5: string;

  @Column()
  grade_4_of_5: string;

  @Column()
  grade_5_of_5: string;
}
