import { Interested } from 'src/interested/entities/interested.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  author_id: string;

  @Column({ type: 'timestamptz' })
  visible_until: Date;

  @OneToMany(() => Interested, (interested) => interested.task)
  interested: Interested[];

  // to get previous/next evaluation done by the user
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
