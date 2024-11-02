import { BadRequestException, Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCanPeopleSeeRecruitmentDto } from './can_people_see_recruitment/dto/create-can_people_see_recruitment.dto';
import { CreateCanEvaluateSurveyDto } from './can_evaluate_surveys/dto/create-can_evaluate_survey.dto';
import { CreateAcceptsSurveyDto } from './accepts_surveys/dto/create-accepts_survey.dto';
import { CreateRecruitmentDto } from './recruitments/dto/create-recruitment.dto';
import { RecruitmentRelatedData } from './recruitments/dto/create-recruitment-related-data-for-frontend.dto';
import { UndefinedCheckPipe } from './pipes/undefined-check.pipe';
import { Roles } from './auth/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello1(): string {
  //   return this.appService.getHello();
  // }

  // @Get('/api/surveys')
  // getHello(): string {
  //   return 'Hello World auth!';
  // }

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
  async setCanPeopleSeeRecruitment(
    @Body('can_people_see_recruitment', UndefinedCheckPipe) can_people_see_recruitment: boolean,
  ) {
    return this.appService.setCanPeopleSeeRecruitment(new CreateCanPeopleSeeRecruitmentDto(can_people_see_recruitment));
  }

  // one switch in survey settings
  @Get('/api/surveys/can-evaluate-surveys')
  async getCanEvaluateSurveys(): Promise<{ can_evaluate_surveys: boolean }> {
    return this.appService.getCanEvaluateSurveys();
  }
  @Post('/api/surveys/can-evaluate-surveys')
  async setCanEvaluateSurveys(@Body('can_evaluate_surveys', UndefinedCheckPipe) can_evaluate_surveys: boolean) {
    return this.appService.setCanEvaluateSurveys(new CreateCanEvaluateSurveyDto(can_evaluate_surveys));
  }

  // one switch in survey settings
  @Get('/api/surveys/accepts-surveys')
  async getAcceptsSurveys(): Promise<{ accepts_surveys: boolean }> {
    return this.appService.getAcceptsSurveys();
  }
  @Post('/api/surveys/accepts-surveys')
  async setAcceptsSurveys(@Body('accepts_surveys', UndefinedCheckPipe) accepts_surveys: boolean) {
    return this.appService.setAcceptsSurveys(new CreateAcceptsSurveyDto(accepts_surveys));
  }

  @Post('/api/surveys/create-recruitment')
  async createRecruitment(
    @Body('name', UndefinedCheckPipe) name: string,
    @Body()
    {
      copy_from_uuid,
      grading_instruction,
      field_to_distinct_the_survey,
    }: { copy_from_uuid?: string; grading_instruction?: string; field_to_distinct_the_survey?: string },
  ) {
    return this.appService.createRecruitment(
      new CreateRecruitmentDto(name, copy_from_uuid, grading_instruction, field_to_distinct_the_survey),
    );
  }

  @Get('/api/surveys/active-recruitment-settings')
  async getActiveRecruitmentSettings() {
    return this.appService.getActiveRecruitmentDataForFrontend();
  }

  @Post('/api/surveys/active-recruitment')
  async setActiveRecruitment(@Body('recruitment_uuid', UndefinedCheckPipe) recruitment_uuid: string) {
    if (!recruitment_uuid) {
      throw new BadRequestException('Invalid recruitment UUID');
    }
    return this.appService.setActiveRecruitment(recruitment_uuid);
  }

  @Post('/api/surveys/save-survey-settings')
  @HttpCode(201)
  async saveSurveySettings(@Body() surveySettings: Partial<RecruitmentRelatedData>) {
    await this.appService.saveSurveySettings(surveySettings);
  }

  @Post('/api/surveys/delete-recruitment')
  async deleteRecruitment(@Body('uuid', UndefinedCheckPipe) uuid: string) {
    if (!uuid) {
      throw new BadRequestException('Invalid recruitment UUID');
    }
    await this.appService.deleteRecruitment(uuid);
  }
}
