import { Injectable } from '@nestjs/common';
import { CreateMarkGradeNameDto } from './dto/create-mark_grade_name.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarkGradeName } from './entities/mark_grade_name.entity';

@Injectable()
export class MarkGradeNamesService {
  constructor(@InjectRepository(MarkGradeName) private markGradeNameRepository: Repository<MarkGradeName>) {}

  async create(createMarkGradeNameDto: CreateMarkGradeNameDto) {
    const markGradeName = new MarkGradeName();
    markGradeName.recruitment_uuid = createMarkGradeNameDto.recruitmentUuid;
    markGradeName.grade_1_of_5 = createMarkGradeNameDto.mark1Tag;
    markGradeName.grade_2_of_5 = createMarkGradeNameDto.mark2Tag;
    markGradeName.grade_3_of_5 = createMarkGradeNameDto.mark3Tag;
    markGradeName.grade_4_of_5 = createMarkGradeNameDto.mark4Tag;
    markGradeName.grade_5_of_5 = createMarkGradeNameDto.mark5Tag;
    await this.markGradeNameRepository.save(markGradeName);
  }

  // findAll() {
  //   return `This action returns all markGradeNames`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} markGradeName`;
  // }

  async update(createMarkGradeNameDto: CreateMarkGradeNameDto) {
    const markGradeName = new MarkGradeName();
    markGradeName.recruitment_uuid = createMarkGradeNameDto.recruitmentUuid;
    markGradeName.grade_1_of_5 = createMarkGradeNameDto.mark1Tag;
    markGradeName.grade_2_of_5 = createMarkGradeNameDto.mark2Tag;
    markGradeName.grade_3_of_5 = createMarkGradeNameDto.mark3Tag;
    markGradeName.grade_4_of_5 = createMarkGradeNameDto.mark4Tag;
    markGradeName.grade_5_of_5 = createMarkGradeNameDto.mark5Tag;
    await this.markGradeNameRepository.update(
      { recruitment_uuid: createMarkGradeNameDto.recruitmentUuid },
      markGradeName,
    );
  }

  async remove(recruitment_uuid: string) {
    await this.markGradeNameRepository.delete({ recruitment_uuid });
  }
}
