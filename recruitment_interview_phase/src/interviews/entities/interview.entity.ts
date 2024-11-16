import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Interview {
  @PrimaryColumn()
  recruit_uuid: string;

  @Column()
  interviewer_uuid: string;

  @Column()
  helper_1_uuid: string;

  @Column()
  helper_2_uuid: string;

  @Column()
  interviewer_review: string;

  @Column()
  helper_1_review: string;

  @Column()
  helper_2_review: string;
}
