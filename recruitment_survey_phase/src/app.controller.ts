import { BadRequestException, Body, Controller, Get, Headers, HttpCode, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCanPeopleSeeRecruitmentDto } from './can_people_see_recruitment/dto/create-can_people_see_recruitment.dto';
import { CreateCanEvaluateSurveyDto } from './can_evaluate_surveys/dto/create-can_evaluate_survey.dto';
import { CreateAcceptsSurveyDto } from './accepts_surveys/dto/create-accepts_survey.dto';
import { CreateRecruitmentDto } from './recruitments/dto/create-recruitment.dto';
import {
  RecruitmentRelatedData,
  RecruitmentRelatedDataForEvaluation,
} from './recruitments/dto/create-recruitment-related-data-for-frontend.dto';
import { UndefinedCheckPipe } from './pipes/undefined-check.pipe';
import { Roles } from './auth/roles.decorator';
import { Survey } from './surveys/schemas/survey.schema';
import { UserId } from './auth/user-id.decorator';
import { UserEvaluation } from './marks/marks.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/api/surveys/hello')
  // getHello1(): string {
  //   return this.appService.getHello();
  // }

  @Roles('USER', 'SUPERADMIN')
  @Get('/api/surveys/active-recruitment-name-uuid')
  async getActiveRecruitmentNameUuid(): Promise<{ name: string; uuid: string } | undefined> {
    return this.appService.getActiveRecruitmentNameUuid();
  }

  @Roles('RECRUITMENT_ADMIN')
  @Get('/api/surveys/all-recruitments-uuid-name-start-date')
  async getAllRecruitmentsUuidNameStartDate(): Promise<{ uuid: string; name: string; startDate: Date }[]> {
    return this.appService.getAllRecruitmentsUuidNameStartDate();
  }

  // one switch in survey settings
  @Roles('USER', 'RECRUITMENT_ADMIN')
  @Get('/api/surveys/can-people-see-recruitment')
  async getCanPeopleSeeRecruitment(): Promise<{ can_people_see_recruitment: boolean }> {
    return { can_people_see_recruitment: await this.appService.getCanPeopleSeeRecruitment() };
  }
  @Roles('RECRUITMENT_ADMIN')
  @Post('/api/surveys/can-people-see-recruitment')
  async setCanPeopleSeeRecruitment(
    @Body('can_people_see_recruitment', UndefinedCheckPipe) can_people_see_recruitment: boolean,
  ) {
    return this.appService.setCanPeopleSeeRecruitment(new CreateCanPeopleSeeRecruitmentDto(can_people_see_recruitment));
  }

  // one switch in survey settings
  @Roles('USER', 'RECRUITMENT_ADMIN')
  @Get('/api/surveys/can-evaluate-surveys')
  async getCanEvaluateSurveys(): Promise<{ can_evaluate_surveys: boolean }> {
    return { can_evaluate_surveys: await this.appService.getCanEvaluateSurveys() };
  }
  @Roles('RECRUITMENT_ADMIN')
  @Post('/api/surveys/can-evaluate-surveys')
  async setCanEvaluateSurveys(@Body('can_evaluate_surveys', UndefinedCheckPipe) can_evaluate_surveys: boolean) {
    return this.appService.setCanEvaluateSurveys(new CreateCanEvaluateSurveyDto(can_evaluate_surveys));
  }

  // one switch in survey settings
  @Roles('USER', 'RECRUITMENT_ADMIN')
  @Get('/api/surveys/accepts-surveys')
  async getAcceptsSurveys(): Promise<{ accepts_surveys: boolean }> {
    return { accepts_surveys: await this.appService.getAcceptsSurveys() };
  }
  @Roles('RECRUITMENT_ADMIN')
  @Post('/api/surveys/accepts-surveys')
  async setAcceptsSurveys(@Body('accepts_surveys', UndefinedCheckPipe) accepts_surveys: boolean) {
    return this.appService.setAcceptsSurveys(new CreateAcceptsSurveyDto(accepts_surveys));
  }

  @Roles('RECRUITMENT_ADMIN')
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

  @Roles('USER', 'RECRUITMENT_ADMIN')
  @Get('/api/surveys/active-recruitment-settings')
  async getActiveRecruitmentSettings() {
    return this.appService.getActiveRecruitmentDataForFrontend();
  }

  @Roles('RECRUITMENT_ADMIN')
  @Post('/api/surveys/active-recruitment')
  async setActiveRecruitment(@Body('recruitment_uuid', UndefinedCheckPipe) recruitment_uuid: string) {
    if (!recruitment_uuid) {
      throw new BadRequestException('Invalid recruitment UUID');
    }
    return this.appService.setActiveRecruitment(recruitment_uuid);
  }

  @Roles('RECRUITMENT_ADMIN')
  @Post('/api/surveys/save-survey-settings')
  @HttpCode(201)
  async saveSurveySettings(@Body() surveySettings: Partial<RecruitmentRelatedData>) {
    await this.appService.saveSurveySettings(surveySettings);
  }

  @Roles('RECRUITMENT_ADMIN')
  @Post('/api/surveys/delete-recruitment')
  async deleteRecruitment(@Body('uuid', UndefinedCheckPipe) uuid: string) {
    if (!uuid) {
      throw new BadRequestException('Invalid recruitment UUID');
    }
    await this.appService.deleteRecruitment(uuid);
  }

  @Roles('skip')
  @Post('/api/surveys/new-survey')
  async createSurvey(
    @Headers('authorization') authHeader: string,
    @Body('responses', UndefinedCheckPipe) responses: [],
  ) {
    return this.appService.newSurvey(authHeader, responses);
  }

  @Roles('USER')
  @Get('/api/surveys/active-recruitemnt-grading-instruction')
  async getActiveRecruitmentGradingInstruction(): Promise<{ grading_instruction: string }> {
    return this.appService.getActiveRecruitmentGradingInstruction();
  }

  @Roles('SUPERADMIN') // for now, then obviously change to evaluator or something
  @Get('/api/surveys/evaluation/previous-survey-uuid')
  async getPreviousSurveyUuid(
    @UserId() userId: string,
    @Query('current_survey_uuid', UndefinedCheckPipe) current_survey_uuid: string,
  ): Promise<{ uuid: string } | null> {
    const result = await this.appService.getPreviousSurveyUuid(userId, current_survey_uuid);
    return result ? { uuid: result } : null;
  }

  @Roles('SUPERADMIN') // for now, then obviously change to evaluator or something
  @Get('/api/surveys/evaluation/next-survey-uuid')
  async getNextSurveyUuid(
    @UserId() userId: string,
    @Query('current_survey_uuid', UndefinedCheckPipe) current_survey_uuid: string,
  ): Promise<{ uuid: string } | null> {
    const result = await this.appService.getNextSurveyUuid(userId, current_survey_uuid);
    return result ? { uuid: result } : null;
  }

  @Roles('USER')
  @Get('/api/surveys/evaluation/criteria')
  async getCriteria(): Promise<RecruitmentRelatedDataForEvaluation> {
    return this.appService.getEvaluationCriteria();
  }

  @Roles('USER')
  @Get('/api/surveys/survey')
  async getSurvey(@Query('uuid', UndefinedCheckPipe) uuid: string): Promise<Survey> {
    return this.appService.getSurvey(uuid);
  }

  @Roles('USER') // for now, then obviously change to evaluator or something,
  // and give USER next / previous based purely on the chronological order of surveys
  @Get('/api/surveys/evaluation/not-evaluated-one')
  async getNotEvaluatedOne(@UserId() userId: string): Promise<Survey | null> {
    return this.appService.getNotEvaluatedOne(userId);
  }

  @Roles('USER') // for now, then obviously change to evaluator or something
  @Post('/api/surveys/evaluation/evaluate')
  async evaluateSurvey(
    @UserId() userId: string,
    @Body('survey_uuid', UndefinedCheckPipe) survey_uuid: string,
    @Body('marks', UndefinedCheckPipe) marks: number[],
    @Body('comment', UndefinedCheckPipe) comment: string,
  ) {
    return this.appService.evaluateSurvey(userId, survey_uuid, marks, comment);
  }

  @Roles('USER') // for now, then obviously change to evaluator or something
  @Put('/api/surveys/evaluation/evaluate')
  async reEvaluateSurvey(
    @UserId() userId: string,
    @Body('survey_uuid', UndefinedCheckPipe) survey_uuid: string,
    @Body('marks', UndefinedCheckPipe) marks: number[],
    @Body('comment', UndefinedCheckPipe) comment: string,
  ) {
    return this.appService.reEvaluateSurvey(userId, survey_uuid, marks, comment);
  }

  @Roles('USER')
  @Get('/api/surveys/evaluation/all-evaluations')
  async getAllEvaluations(
    @UserId() userId: string,
    @Headers('authorization') authorization: string,
    @Query('survey_uuid', UndefinedCheckPipe) surveyUuid: string,
  ): Promise<UserEvaluation[] | null> {
    return this.appService.getAllEvaluations(userId, authorization, surveyUuid);
  }
}
