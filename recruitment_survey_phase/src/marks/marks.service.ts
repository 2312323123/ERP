import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import { In, Repository } from 'typeorm';
import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';

@Injectable()
export class MarksService {
  constructor(@InjectRepository(Mark) private markRepository: Repository<Mark>) {}

  async suchMarksExist(userId: string, survey_uuid: string): Promise<boolean> {
    return this.markRepository.findOne({ where: { evaluator_id: userId, survey_uuid } }).then((mark) => !!mark);
  }

  async storeMarks(
    userId: string,
    survey_uuid: string,
    marks: number[],
    surveyMetadata: SurveyMetadata,
  ): Promise<void> {
    if (marks.length > 100) {
      throw new BadRequestException('Marks array is too long');
    }
    const marksValid = marks.every((mark) => [1, 2, 3, 4, 5].includes(mark));
    if (!marksValid) {
      throw new BadRequestException('All marks have to be one of 1, 2, 3, 4, 5');
    }

    const markEntities = marks.map((markValue, index) => {
      const mark = new Mark();
      mark.evaluator_id = userId;
      mark.survey_uuid = survey_uuid;
      mark.order = index;
      mark.number_value = markValue;
      mark.survey_metadata = surveyMetadata;
      return mark;
    });

    await this.markRepository.save(markEntities);
  }

  async updateMarks(userId: string, survey_uuid: string, marks: number[]): Promise<void> {
    if (marks.length > 100) {
      throw new BadRequestException('Marks array is too long');
    }
    const marksValid = marks.every((mark) => [1, 2, 3, 4, 5].includes(mark));
    if (!marksValid) {
      throw new BadRequestException('All marks have to be one of 1, 2, 3, 4, 5');
    }

    // retrieve all required marks at once
    const existingMarks = await this.markRepository.find({
      where: {
        evaluator_id: userId,
        survey_uuid: survey_uuid,
        order: In(marks.map((_, index) => index)), // Fetch marks with specific orders
      },
    });

    // check if any mark is missing
    const existingOrders = new Set(existingMarks.map((mark) => mark.order));
    const missingOrders = marks.map((_, index) => index).filter((order) => !existingOrders.has(order));

    if (missingOrders.length > 0) {
      throw new NotFoundException(`Marks missing for orders: ${missingOrders.join(', ')}`);
    }

    // update marks as all required entries are present
    for (let i = 0; i < marks.length; i++) {
      const mark = existingMarks.find((m) => m.order === i);
      if (mark) {
        mark.number_value = marks[i];
      }
    }

    // save all updated marks at once
    await this.markRepository.save(existingMarks);
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
