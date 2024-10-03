import { Injectable } from '@nestjs/common';
import { CreateAcceptsSurveyDto } from './dto/create-accepts_survey.dto';
import { UpdateAcceptsSurveyDto } from './dto/update-accepts_survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AcceptsSurvey } from './entities/accepts_survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AcceptsSurveysService {
  constructor(@InjectRepository(AcceptsSurvey) private acceptsSurveyRepository: Repository<AcceptsSurvey>) {}

  create(createAcceptsSurveyDto: CreateAcceptsSurveyDto) {
    return 'This action adds a new acceptsSurvey';
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

  setAcceptsSurveys() {}

  getAcceptsSurveys() {}
}
