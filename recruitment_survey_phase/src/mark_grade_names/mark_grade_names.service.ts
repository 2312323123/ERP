import { Injectable } from '@nestjs/common';
import { CreateMarkGradeNameDto } from './dto/create-mark_grade_name.dto';
import { UpdateMarkGradeNameDto } from './dto/update-mark_grade_name.dto';

@Injectable()
export class MarkGradeNamesService {
  create(createMarkGradeNameDto: CreateMarkGradeNameDto) {
    return 'This action adds a new markGradeName';
  }

  findAll() {
    return `This action returns all markGradeNames`;
  }

  findOne(id: number) {
    return `This action returns a #${id} markGradeName`;
  }

  update(id: number, updateMarkGradeNameDto: UpdateMarkGradeNameDto) {
    return `This action updates a #${id} markGradeName`;
  }

  remove(id: number) {
    return `This action removes a #${id} markGradeName`;
  }
}
