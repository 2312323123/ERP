import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestEntity } from './postgres/test.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TestEntity)
    private testRepository: Repository<TestEntity>,
  ) {}

  // PostgreSQL operations
  async writeToPostgres(message: string): Promise<TestEntity> {
    const test = this.testRepository.create({
      message,
      timestamp: new Date(),
    });
    return this.testRepository.save(test);
  }

  async readFromPostgres(): Promise<TestEntity[]> {
    return this.testRepository.find();
  }

  async clearPostgres(): Promise<void> {
    await this.testRepository.clear();
  }
}
