import { PartialType } from '@nestjs/mapped-types';
import { CreateMarkGradeNameDto } from './create-mark_grade_name.dto';

export class UpdateMarkGradeNameDto extends PartialType(CreateMarkGradeNameDto) {}
