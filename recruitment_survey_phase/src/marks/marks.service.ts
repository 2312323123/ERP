import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarksService {
  constructor(@InjectRepository(Mark) private markRepository: Repository<Mark>) {}

  async suchMarksExist(userId: string, survey_uuid: string): Promise<boolean> {
    return this.markRepository.findOne({ where: { evaluator_id: userId, survey_uuid } }).then((mark) => !!mark);
  }

  async storeMarks(userId: string, survey_uuid: string, marks: number[]): Promise<void> {
    if (marks.length > 100) {
      throw new BadRequestException('Marks array is too long');
    }
    const marksValid = marks.every((mark) => [1, 2, 3, 4, 5].includes(mark));
    if (!marksValid) {
      throw new BadRequestException('All marks have to be one of 1, 2, 3, 4, 5');
    }
    for (let i = 0; i < marks.length; i++) {
      const mark = new Mark();
      mark.evaluator_id = userId;
      mark.survey_uuid = survey_uuid;
      mark.order = i;
      mark.number_value = marks[i];
      await this.markRepository.save(mark);
    }
  }

  // create(createMarkDto: CreateMarkDto) {
  //   return 'This action adds a new mark';
  // }

  // findAll() {
  //   return `This action returns all marks`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} mark`;
  // }

  // update(id: number, updateMarkDto: UpdateMarkDto) {
  //   return `This action updates a #${id} mark`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} mark`;
  // }
}
