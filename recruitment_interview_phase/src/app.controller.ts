import { Body, Controller, Delete, Get, Headers, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';
import { UndefinedCheckPipe } from './pipes/undefined-check.pipe';
import { InterviewsService } from './interviews/interviews.service';
import { CreateInterviewDto } from './interviews/dto/create-interview.dto';
import { UserId } from './auth/user-id.decorator';
import { UpdateInterviewDto } from './interviews/dto/update-interview.dto';
import { InterviewsSettingsService } from './interviews_settings/interviews_settings.service';

export interface InterviewsMainPage {
  fieldToDistinctTheSurvey1: string;
  fieldToDistinctTheSurvey2: string;
  interviews: Array<{
    survey_uuid: string;
    fieldToDistinctTheSurvey1Value: string;
    fieldToDistinctTheSurvey2Value: string | undefined;
    interviewerId: string | null;
    helper1Id: string | null;
    helper2Id: string | null;
    interviewerOpinion: string | null;
    helper1Opinion: string | null;
    helper2Opinion: string | null;
  }>;
}

export interface InterviewsSettingsPage {
  fieldToDistinctTheSurvey1: string;
  fieldToDistinctTheSurvey2: string;
  interviews: Array<{
    survey_uuid: string;
    fieldToDistinctTheSurvey1Value: string;
    fieldToDistinctTheSurvey2Value: string | undefined;
    interviewerId: string | null;
    helper1Id: string | null;
    helper2Id: string | null;
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
  async getInterviewMainPage(@Headers('Authorization') authHeader: string): Promise<InterviewsMainPage | void> {
    return this.appService.getInterviewsMainPage(authHeader); // Pass authHeader to the service if needed
  }

  @Roles('RECRUITMENT_ADMIN')
  @Get('/api/interviews-settings-page')
  async getInterviewSettingsPage(@Headers('Authorization') authHeader: string): Promise<InterviewsSettingsPage | void> {
    return this.appService.getInterviewsSettingsPage(authHeader);
  }
}
