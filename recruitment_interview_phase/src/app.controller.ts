import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';
import { UndefinedCheckPipe } from './pipes/undefined-check.pipe';
import { InterviewsService } from './interviews/interviews.service';
import { CreateInterviewDto } from './interviews/dto/create-interview.dto';
import { UserId } from './auth/user-id.decorator';
import { UpdateInterviewDto } from './interviews/dto/update-interview.dto';
import { InterviewsSettingsService } from './interviews_settings/interviews_settings.service';

export interface InterviewsMainPage {
  interviews: Array<{
    survey_uuid: string;
    fieldToDistinctTheSurvey1Value: string;
    fieldToDistinctTheSurvey2Value: string | undefined;
    interviewerId: string | undefined;
    helper1Id: string | undefined;
    helper2Id: string | undefined;
    interviewerOpinion: string | undefined;
    helper1Opinion: string | undefined;
    helper2Opinion: string | undefined;
  }>;
}

export interface InterviewsSettingsPage {
  fieldToDistinctTheSurvey2: string;
  interviews: Array<{
    survey_uuid: string;
    fieldToDistinctTheSurvey1Value: string;
    fieldToDistinctTheSurvey2Value: string | undefined;
    interviewerId: string | undefined;
    helper1Id: string | undefined;
    helper2Id: string | undefined;
  }>;
  notInterviewed: Array<{
    // includes the potential interviews for people from current recruitment who are not in the interviews list
    survey_uuid: string;
    fieldToDistinctTheSurvey1Value: string;
    fieldToDistinctTheSurvey2Value: string | undefined;
  }>;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly interviewsService: InterviewsService,
    private readonly interviewsSettingsService: InterviewsSettingsService,
  ) {}

  @Roles('skip')
  @Get('/api/interviews')
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles('RECRUITMENT_ADMIN')
  @Post('/api/interview')
  async createInterview(
    @Body('createInterviewDto', UndefinedCheckPipe) createInterviewDto: CreateInterviewDto,
  ): Promise<void> {
    return this.interviewsService.create(createInterviewDto);
  }

  @Roles('USER')
  @Put('/api/interview')
  async setOpinion(
    @UserId() userId: string,
    @Body('updateInterviewDto', UndefinedCheckPipe) updateInterviewDto: UpdateInterviewDto,
  ): Promise<void> {
    return this.interviewsService.setOpinion(userId, updateInterviewDto);
  }

  @Roles('RECRUITMENT_ADMIN')
  @Delete('/api/interview')
  async deleteInterview(@Body('recruit_uuid', UndefinedCheckPipe) recruit_uuid: string): Promise<void> {
    return this.interviewsService.delete(recruit_uuid);
  }

  @Roles('RECRUITMENT_ADMIN')
  @Post('/api/interview-identification-field-2')
  async setInterviewIdentificationField2(
    @Body('interviewIdentificationField2', UndefinedCheckPipe) interviewIdentificationField2: string,
  ): Promise<void> {
    return this.interviewsSettingsService.set({ field_to_distinct_the_survey_2: interviewIdentificationField2 });
  }

  @Roles('USER')
  @Get('/api/interviews-main-page')
  async getInterviewMainPage(): Promise<InterviewsMainPage | void> {
    return this.appService.getInterviewsMainPage();
  }

  // @Roles('RECRUITMENT_ADMIN')
  // @Get('/api/interviews-settings-page')
  // async getInterviewSettingsPage(): Promise<any> {
  //   return this.interviewsSettingsService.get();
  // }
}
