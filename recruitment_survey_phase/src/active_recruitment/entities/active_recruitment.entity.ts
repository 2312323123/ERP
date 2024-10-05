import { Recruitment } from 'src/recruitments/entities/recruitment.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ActiveRecruitment {
  @PrimaryColumn()
  recruitment_uuid: string;

  @OneToOne(() => Recruitment)
  @JoinColumn({ name: 'recruitment_uuid' })
  recruitment: Recruitment;
}
