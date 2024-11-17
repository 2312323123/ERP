import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Interview {
  @PrimaryColumn()
  recruit_uuid: string;

  @Column({ nullable: true })
  interviewer_uuid: string;

  @Column({ nullable: true })
  helper_1_uuid: string;

  @Column({ nullable: true })
  helper_2_uuid: string;

  @Column({ nullable: true })
  interviewer_review: string;

  @Column({ nullable: true })
  helper_1_review: string;

  @Column({ nullable: true })
  helper_2_review: string;
}
