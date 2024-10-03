import { Injectable } from '@nestjs/common';
import { CreateCanEvaluateSurveyDto } from './dto/create-can_evaluate_survey.dto';
import { UpdateCanEvaluateSurveyDto } from './dto/update-can_evaluate_survey.dto';

@Injectable()
export class CanEvaluateSurveysService {
  create(createCanEvaluateSurveyDto: CreateCanEvaluateSurveyDto) {
    return 'This action adds a new canEvaluateSurvey';
  }

  findAll() {
    return `This action returns all canEvaluateSurveys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} canEvaluateSurvey`;
  }

  update(id: number, updateCanEvaluateSurveyDto: UpdateCanEvaluateSurveyDto) {
    return `This action updates a #${id} canEvaluateSurvey`;
  }

  remove(id: number) {
    return `This action removes a #${id} canEvaluateSurvey`;
  }
}
