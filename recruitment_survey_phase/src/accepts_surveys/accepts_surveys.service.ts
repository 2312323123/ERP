import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAcceptsSurveyDto } from './dto/create-accepts_survey.dto';
import { UpdateAcceptsSurveyDto } from './dto/update-accepts_survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AcceptsSurvey } from './entities/accepts_survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AcceptsSurveysService {
  constructor(@InjectRepository(AcceptsSurvey) private acceptsSurveyRepository: Repository<AcceptsSurvey>) {}

  async setAcceptsSurveys(createAcceptsSurveyDto: CreateAcceptsSurveyDto) {
    // Check if the value is a boolean
    if (typeof createAcceptsSurveyDto.accepts_surveys === 'boolean') {
      // Await the repository update
      await this.acceptsSurveyRepository.update({}, { accepts_surveys: createAcceptsSurveyDto.accepts_surveys });
    } else {
      // Throw an exception if the value is not valid
      throw new BadRequestException('Invalid value for accepts_surveys 34r5t');
    }
  }

  async getAcceptsSurveys() {
    const res = await this.acceptsSurveyRepository.find({
      take: 1,
    });
    if (res === null) {
      throw new BadRequestException('No records in accepts_survey table 45re3');
    }
    return res[0];
  }

  findAll() {
    return `This action returns all acceptsSurveys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} acceptsSurvey`;
  }

  update(id: number, updateAcceptsSurveyDto: UpdateAcceptsSurveyDto) {
    return `This action updates a #${id} acceptsSurvey`;
  }

  remove(id: number) {
    return `This action removes a #${id} acceptsSurvey`;
  }
}
