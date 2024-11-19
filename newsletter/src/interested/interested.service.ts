import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interested } from './entities/interested.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class InterestedService {
  constructor(
    @InjectRepository(Interested) private interestedRepository: Repository<Interested>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async interested(userId: string, uuid: string) {
    const existingInterested = await this.interestedRepository.findOne({
      where: { person_id: userId, task: { uuid } },
    });
    if (existingInterested) {
      return;
    }
    const task = await this.taskRepository.findOne({ where: { uuid } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const interested = this.interestedRepository.create({
      person_id: userId,
      task: task,
    });
    await this.interestedRepository.save(interested);
  }

  async notInterested(userId: string, uuid: string) {
    const existingInterested = await this.interestedRepository.findOne({
      where: { person_id: userId, task: { uuid } },
    });
    if (!existingInterested) {
      return;
    }
    await this.interestedRepository.delete({ person_id: userId, task: { uuid } });
  }
}
