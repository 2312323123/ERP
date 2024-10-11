import { Injectable } from '@nestjs/common';
import { CreateCanEvaluateSurveyDto } from './dto/create-can_evaluate_survey.dto';
import { UpdateCanEvaluateSurveyDto } from './dto/update-can_evaluate_survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CanEvaluateSurvey } from './entities/can_evaluate_survey.entity';

@Injectable()
export class CanEvaluateSurveysService {
  constructor(
    @InjectRepository(CanEvaluateSurvey) private canEvaluateSurveyRepository: Repository<CanEvaluateSurvey>,
  ) {}

  setCanEvaluateSurveys(createCanEvaluateSurveyDto: CreateCanEvaluateSurveyDto) {
    return this.canEvaluateSurveyRepository.save(createCanEvaluateSurveyDto);
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
