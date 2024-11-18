import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // to get previous/next evaluation done by the user
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
