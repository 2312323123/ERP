import { BadRequestException, Injectable } from '@nestjs/common';
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

  async setCanEvaluateSurveys(createCanEvaluateSurveyDto: CreateCanEvaluateSurveyDto) {
    // Check if the value is a boolean
    if (typeof createCanEvaluateSurveyDto.can_evaluate_surveys === 'boolean') {
      // Await the repository update
      await this.canEvaluateSurveyRepository.update(
        {},
        { can_evaluate_surveys: createCanEvaluateSurveyDto.can_evaluate_surveys },
      );
    } else {
      // Throw an exception if the value is not valid
      throw new BadRequestException('Invalid value for can_evaluate_surveys 34r5t');
    }
  }

  async getCanEvaluateSurveys() {
    const res = await this.canEvaluateSurveyRepository.find({
      take: 1,
    });
    if (res === null) {
      throw new BadRequestException('No records in can_evaluate_survey table it845');
    }
    return res[0];
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
