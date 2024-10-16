import { Injectable } from '@nestjs/common';
import { ActiveRecruitmentService } from './active_recruitment/active_recruitment.service';
import { RecruitmentsService } from './recruitments/recruitments.service';
import { CanPeopleSeeRecruitmentService } from './can_people_see_recruitment/can_people_see_recruitment.service';
import { CanEvaluateSurveysService } from './can_evaluate_surveys/can_evaluate_surveys.service';
import { AcceptsSurveysService } from './accepts_surveys/accepts_surveys.service';
import { CreateAcceptsSurveyDto } from './accepts_surveys/dto/create-accepts_survey.dto';
import { CreateCanEvaluateSurveyDto } from './can_evaluate_surveys/dto/create-can_evaluate_survey.dto';
import { CreateCanPeopleSeeRecruitmentDto } from './can_people_see_recruitment/dto/create-can_people_see_recruitment.dto';
import { CreateRecruitmentDto } from './recruitments/dto/create-recruitment.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly activeRecruitmentService: ActiveRecruitmentService,
    private readonly recruitmentsService: RecruitmentsService,
    private readonly canPeopleSeeRecruitmentService: CanPeopleSeeRecruitmentService,
    private readonly canEvaluateSurveysService: CanEvaluateSurveysService,
    private readonly acceptsSurveysService: AcceptsSurveysService,
  ) {}

  getHello(): string {
    return 'Hello World survey!';
  }

  async getActiveRecruitmentNameUuid(): Promise<{ name: string; uuid: string } | undefined> {
    return this.activeRecruitmentService.getActiveRecruitmentNameUuid();
  }

  async getAllRecruitmentsUuidNameStartDate(): Promise<{ uuid: string; name: string; startDate: Date }[]> {
    return this.recruitmentsService.getAllRecruitmentsUuidNameStartDate();
  }

  // one switch in survey settings - can_people_see_recruitment
  async getCanPeopleSeeRecruitment(): Promise<CreateCanPeopleSeeRecruitmentDto> {
    return await this.canPeopleSeeRecruitmentService.getCanPeopleSeeRecruitment();
  }
  async setCanPeopleSeeRecruitment(createCanPeopleSeeRecruitmentDto: CreateCanPeopleSeeRecruitmentDto) {
    return await this.canPeopleSeeRecruitmentService.setCanPeopleSeeRecruitment(createCanPeopleSeeRecruitmentDto);
  }

  // one switch in survey settings - can_evaluate_surveys
  async getCanEvaluateSurveys(): Promise<CreateCanEvaluateSurveyDto> {
    return await this.canEvaluateSurveysService.getCanEvaluateSurveys();
  }
  async setCanEvaluateSurveys(createCanEvaluateSurveyDto: CreateCanEvaluateSurveyDto) {
    return await this.canEvaluateSurveysService.setCanEvaluateSurveys(createCanEvaluateSurveyDto);
  }

  // one switch in survey settings - accepts_surveys
  async getAcceptsSurveys(): Promise<CreateAcceptsSurveyDto> {
    return await this.acceptsSurveysService.getAcceptsSurveys();
  }
  async setAcceptsSurveys(createAcceptsSurveyDto: CreateAcceptsSurveyDto) {
    return await this.acceptsSurveysService.setAcceptsSurveys(createAcceptsSurveyDto);
  }

  async createRecruitment(createRecruitmentDto: CreateRecruitmentDto) {
    return this.recruitmentsService.create(createRecruitmentDto);
  }

  async getActiveRecruitmentDataForFrontend() {
    return this.recruitmentsService.getActiveRecruitmentDataForFrontend();
  }
}
