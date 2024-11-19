import { Task } from 'src/tasks/entities/task.entity';
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Interested {
  @PrimaryGeneratedColumn('uuid')
  uuid_for_primary_column_sake: string;

  @PrimaryColumn()
  person_id: string;

  @ManyToOne(() => Task, (task) => task.uuid)
  task: Task;

  // to get previous/next evaluation done by the user
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
