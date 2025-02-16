import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AcceptsSurvey } from 'src/accepts_surveys/entities/accepts_survey.entity';
import { CanEvaluateSurvey } from 'src/can_evaluate_surveys/entities/can_evaluate_survey.entity';
import { CanPeopleSeeRecruitment } from 'src/can_people_see_recruitment/entities/can_people_see_recruitment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(AcceptsSurvey) private acceptsSurveyRepository: Repository<AcceptsSurvey>,
    @InjectRepository(CanEvaluateSurvey) private canEvaluateSurveyRepository: Repository<CanEvaluateSurvey>,
    @InjectRepository(CanPeopleSeeRecruitment)
    private canPeopleSeeRecruitmentRepository: Repository<CanPeopleSeeRecruitment>,
  ) {}
  async onModuleInit() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    // initialize accepts_surveys to true
    const acceptsSurveysCount = await this.acceptsSurveyRepository.count();
    if (acceptsSurveysCount === 0) {
      const initialEntity = this.acceptsSurveyRepository.create({
        accepts_surveys: true,
      });
      await this.acceptsSurveyRepository.save(initialEntity);
      console.log('Initial entity added to the accepts_surveys table');
    } else {
      console.log('accepts_surveys Table already has data, no seeding required');
    }

    // initialize can_evaluete_surveys to false
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

    // initialize can_people_see_recruitment to false
    const canPeopleSeeRecruitmentCount = await this.canPeopleSeeRecruitmentRepository.count();
    if (canPeopleSeeRecruitmentCount === 0) {
      const initialEntity = this.canPeopleSeeRecruitmentRepository.create({
        can_people_see_recruitment: false,
      });
      await this.canPeopleSeeRecruitmentRepository.save(initialEntity);
      console.log('Initial entity added to the can_people_see_recruitment table');
    } else {
      console.log('can_people_see_recruitment Table already has data, no seeding required');
    }
  }
}
