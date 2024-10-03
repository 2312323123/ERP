import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mark])],
  controllers: [MarksController],
  providers: [MarksService],
})
export class MarksModule {}
