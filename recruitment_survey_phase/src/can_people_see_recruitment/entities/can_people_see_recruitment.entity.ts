import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CanPeopleSeeRecruitment {
  @PrimaryColumn({ unique: true })
  can_people_see_recruitment: boolean;
}
