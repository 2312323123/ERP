import { Injectable } from '@nestjs/common';
import { CreateAcceptSurveyDto } from './dto/create-accept_survey.dto';
import { UpdateAcceptSurveyDto } from './dto/update-accept_survey.dto';

@Injectable()
export class AcceptSurveysService {
  create(createAcceptSurveyDto: CreateAcceptSurveyDto) {
    return 'This action adds a new acceptSurvey';
  }

  findAll() {
    return `This action returns all acceptSurveys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} acceptSurvey`;
  }

  update(id: number, updateAcceptSurveyDto: UpdateAcceptSurveyDto) {
    return `This action updates a #${id} acceptSurvey`;
  }

  remove(id: number) {
    return `This action removes a #${id} acceptSurvey`;
  }
}
