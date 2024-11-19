import { Injectable } from '@nestjs/common';
import { TaskForExport, TaskForImport } from './interfaces/task.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Interested } from 'src/interested/entities/interested.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Interested) private interestedRepository: Repository<Interested>,
  ) {}

  async getTasks(): Promise<TaskForExport[]> {
    const currentTimestamp = new Date();

    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.interested', 'interested')
      .where('task.visible_until > :currentTimestamp', { currentTimestamp })
      .orderBy('task.createdAt', 'DESC')
      .addOrderBy('interested.createdAt', 'ASC')
      .getMany();

    return tasks.map((task) => ({
      uuid: task.uuid,
      name: task.name,
      description: task.description,
      author_id: task.author_id,
      visible_until: task.visible_until,
      interested: task.interested.map((interest) => ({
        user_id: interest.person_id,
      })),
    })) as TaskForExport[];
  }

  async createTask(userId: string, createTaskDto: TaskForImport): Promise<void> {
    const newTask = this.taskRepository.create({
      name: createTaskDto.name,
      description: createTaskDto.description,
      visible_until: createTaskDto.visible_until,
      author_id: userId,
    });

    await this.taskRepository.save(newTask);
  }
}
