import { Module } from '@nestjs/common';
import { MarkGradeNamesService } from './mark_grade_names.service';
import { MarkGradeNamesController } from './mark_grade_names.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkGradeName } from './entities/mark_grade_name.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarkGradeName])],
  controllers: [MarkGradeNamesController],
  providers: [MarkGradeNamesService],
  exports: [TypeOrmModule, MarkGradeNamesService],
})
export class MarkGradeNamesModule {}
