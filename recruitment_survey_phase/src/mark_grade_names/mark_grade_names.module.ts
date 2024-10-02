import { Module } from '@nestjs/common';
import { MarkGradeNamesService } from './mark_grade_names.service';
import { MarkGradeNamesController } from './mark_grade_names.controller';

@Module({
  controllers: [MarkGradeNamesController],
  providers: [MarkGradeNamesService],
})
export class MarkGradeNamesModule {}
