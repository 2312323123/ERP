import { Module } from '@nestjs/common';
import { InterestedService } from './interested.service';
import { InterestedController } from './interested.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interested } from './entities/interested.entity';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Interested]), TasksModule],
  controllers: [InterestedController],
  providers: [InterestedService],
  exports: [InterestedService, TypeOrmModule],
})
export class InterestedModule {}
