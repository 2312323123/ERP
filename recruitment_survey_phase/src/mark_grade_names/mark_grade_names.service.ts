import { Injectable } from '@nestjs/common';
import { CreateMarkGradeNameDto } from './dto/create-mark_grade_name.dto';
import { UpdateMarkGradeNameDto } from './dto/update-mark_grade_name.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarkGradeName } from './entities/mark_grade_name.entity';

@Injectable()
export class MarkGradeNamesService {
  constructor(@InjectRepository(MarkGradeName) markGradeNameRepository: Repository<MarkGradeName>) {}

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
