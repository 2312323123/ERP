import { Task } from 'src/tasks/entities/task.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Interested {
  @Column()
  person_id: string;

  @ManyToOne(() => Task, (task) => task.uuid)
  task: Task;

  // to get previous/next evaluation done by the user
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
