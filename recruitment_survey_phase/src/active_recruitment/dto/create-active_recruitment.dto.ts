import { Recruitment } from 'src/recruitments/entities/recruitment.entity';
import { JoinColumn, OneToOne } from 'typeorm';

export class CreateActiveRecruitmentDto {
  uuid: string;

  @OneToOne(() => Recruitment)
  @JoinColumn({ name: 'uuid' })
  recruitment: Recruitment;
}
