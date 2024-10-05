import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AcceptsSurvey } from 'src/accepts_surveys/entities/accepts_survey.entity';
import { CanEvaluateSurvey } from 'src/can_evaluate_surveys/entities/can_evaluate_survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(AcceptsSurvey) private acceptsSurveyRepository: Repository<AcceptsSurvey>,
    @InjectRepository(CanEvaluateSurvey) private canEvaluateSurveyRepository: Repository<CanEvaluateSurvey>,
  ) {}
  async onModuleInit() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    const acceptsSurveysCount = await this.acceptsSurveyRepository.count();
    if (acceptsSurveysCount === 0) {
      const initialEntity = this.acceptsSurveyRepository.create({
        accepts_surveys: false,
      });
      await this.acceptsSurveyRepository.save(initialEntity);
      console.log('Initial entity added to the accepts_surveys table');
    } else {
      console.log('accepts_surveys Table already has data, no seeding required');
    }

    const canEvaluateSurveysCount = await this.canEvaluateSurveyRepository.count();
    if (canEvaluateSurveysCount === 0) {
      const initialEntity = this.canEvaluateSurveyRepository.create({
        can_evaluate_surveys: false,
      });
      await this.canEvaluateSurveyRepository.save(initialEntity);
      console.log('Initial entity added to the can_evaluate_survey table');
    } else {
      console.log('can_evaluate_survey Table already has data, no seeding required');
    }
  }
}
