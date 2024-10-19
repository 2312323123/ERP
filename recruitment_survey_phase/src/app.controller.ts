import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCanPeopleSeeRecruitmentDto } from './can_people_see_recruitment/dto/create-can_people_see_recruitment.dto';
import { CreateCanEvaluateSurveyDto } from './can_evaluate_surveys/dto/create-can_evaluate_survey.dto';
import { CreateAcceptsSurveyDto } from './accepts_surveys/dto/create-accepts_survey.dto';
import { CreateRecruitmentDto } from './recruitments/dto/create-recruitment.dto';
import { CreateActiveRecruitmentDto } from './active_recruitment/dto/create-active_recruitment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello1(): string {
    return this.appService.getHello();
  }

  @Get('/api/surveys')
  getHello(): string {
    return 'Hello World auth!';
  }

  @Get('/api/surveys/active-recruitment-name-uuid')
  async getActiveRecruitmentNameUuid(): Promise<{ name: string; uuid: string } | undefined> {
    return this.appService.getActiveRecruitmentNameUuid();
  }

  @Get('/api/surveys/all-recruitments-uuid-name-start-date')
  async getAllRecruitmentsUuidNameStartDate(): Promise<{ uuid: string; name: string; startDate: Date }[]> {
    return this.appService.getAllRecruitmentsUuidNameStartDate();
  }

  // one switch in survey settings
  @Get('/api/surveys/can-people-see-recruitment')
  async getCanPeopleSeeRecruitment(): Promise<{ can_people_see_recruitment: boolean }> {
    return this.appService.getCanPeopleSeeRecruitment();
  }
  @Post('/api/surveys/can-people-see-recruitment')
  async setCanPeopleSeeRecruitment(@Body() createCanPeopleSeeRecruitmentDto: CreateCanPeopleSeeRecruitmentDto) {
    return this.appService.setCanPeopleSeeRecruitment(createCanPeopleSeeRecruitmentDto);
  }

  // one switch in survey settings
  @Get('/api/surveys/can-evaluate-surveys')
  async getCanEvaluateSurveys(): Promise<{ can_evaluate_surveys: boolean }> {
    return this.appService.getCanEvaluateSurveys();
  }
  @Post('/api/surveys/can-evaluate-surveys')
  async setCanEvaluateSurveys(@Body() createCanEvaluateSurveysDto: CreateCanEvaluateSurveyDto) {
    return this.appService.setCanEvaluateSurveys(createCanEvaluateSurveysDto);
  }

  // one switch in survey settings
  @Get('/api/surveys/accepts-surveys')
  async getAcceptsSurveys(): Promise<{ accepts_surveys: boolean }> {
    return this.appService.getAcceptsSurveys();
  }
  @Post('/api/surveys/accepts-surveys')
  async setAcceptsSurveys(@Body() createAcceptsSurveysDto: CreateAcceptsSurveyDto) {
    return this.appService.setAcceptsSurveys(createAcceptsSurveysDto);
  }

  @Post('/api/surveys/create-recruitment')
  async createRecruitment(@Body() createRecruitmentDto: CreateRecruitmentDto) {
    return this.appService.createRecruitment(createRecruitmentDto);
  }

  @Get('/api/surveys/active-recruitment-settings')
  async getActiveRecruitmentSettings() {
    return this.appService.getActiveRecruitmentDataForFrontend();
  }

  @Post('/api/surveys/active-recruitment')
  async setActiveRecruitment(@Body() createActiveRecruitmentDto: CreateActiveRecruitmentDto) {
    if (!createActiveRecruitmentDto.recruitment_uuid) {
      throw new BadRequestException('Invalid recruitment UUID');
    }
    return this.appService.setActiveRecruitment(createActiveRecruitmentDto.recruitment_uuid);
  }
}
