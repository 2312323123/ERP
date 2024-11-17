import { Injectable } from '@nestjs/common';
import { InterviewsMainPage, InterviewsSettingsPage } from './app.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from './interviews/entities/interview.entity';
import { Repository } from 'typeorm';
import { RetrieveSurveysDistinctiveFieldsService } from './retrieve_surveys_distinctive_fields/retrieve_surveys_distinctive_fields.service';
import { InterviewsSettingsService } from './interviews_settings/interviews_settings.service';
import { InterviewsService } from './interviews/interviews.service';

export interface ExtendedFields {
  settings: { fieldToDistinctTheSurvey1Value: string; fieldToDistinctTheSurvey2Value: string };
  uuidsExtended: {
    [survey_uuid: string]: {
      survey_uuid: string;
      df1: any;
      df2: any;
    };
  };
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewsRepository: Repository<Interview>,
    private readonly retrieveSurveysDistinctiveFieldsService: RetrieveSurveysDistinctiveFieldsService,
    private readonly interviewsSettingsService: InterviewsSettingsService,
    private readonly interviewsService: InterviewsService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getInterviewsMainPage(authHeader: string): Promise<InterviewsMainPage | void> {
    const {
      settings: { fieldToDistinctTheSurvey1Value, fieldToDistinctTheSurvey2Value },
      uuidsExtended,
    } = await this.getExistingInterviewsExtendedFields(authHeader);

    const interviews = [] as Array<{
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

    for (const [key, value] of Object.entries(uuidsExtended)) {
      const interview = await this.interviewsService.findOneOrError(key);

      interviews.push({
        survey_uuid: key,
        fieldToDistinctTheSurvey1Value: value.df1,
        fieldToDistinctTheSurvey2Value: value.df2,
        interviewerId: interview.interviewer_uuid,
        helper1Id: interview.helper_1_uuid,
        helper2Id: interview.helper_2_uuid,
        interviewerOpinion: interview.interviewer_review,
        helper1Opinion: interview.helper_1_review,
        helper2Opinion: interview.helper_2_review,
      });
    }

    return {
      fieldToDistinctTheSurvey1: fieldToDistinctTheSurvey1Value,
      fieldToDistinctTheSurvey2: fieldToDistinctTheSurvey2Value,
      interviews,
    };
  }

  async getInterviewsSettingsPage(authHeader: string): Promise<InterviewsSettingsPage | void> {
    const {
      settings: { fieldToDistinctTheSurvey1Value, fieldToDistinctTheSurvey2Value },
      uuidsExtended,
    } = await this.getExistingInterviewsExtendedFields(authHeader);
    const dupae = await this.getAllInterviewsExtendedFields(authHeader);

    const interviews = [] as Array<{
      survey_uuid: string;
      fieldToDistinctTheSurvey1Value: string;
      fieldToDistinctTheSurvey2Value: string | undefined;
      interviewerId: string | null;
      helper1Id: string | null;
      helper2Id: string | null;
    }>;

    for (const [key, value] of Object.entries(uuidsExtended)) {
      const interview = await this.interviewsService.findOneOrError(key);

      interviews.push({
        survey_uuid: key,
        fieldToDistinctTheSurvey1Value: value.df1,
        fieldToDistinctTheSurvey2Value: value.df2,
        interviewerId: interview.interviewer_uuid,
        helper1Id: interview.helper_1_uuid,
        helper2Id: interview.helper_2_uuid,
      });
    }

    const notInterviewed = [] as Array<{
      survey_uuid: string;
      fieldToDistinctTheSurvey1Value: string;
      fieldToDistinctTheSurvey2Value: string | undefined;
    }>;

    for (const [key, value] of Object.entries(dupae.uuidsExtended)) {
      if (!uuidsExtended[key]) {
        notInterviewed.push({
          survey_uuid: key,
          fieldToDistinctTheSurvey1Value: value.df1,
          fieldToDistinctTheSurvey2Value: value.df2,
        });
      }
    }

    return {
      fieldToDistinctTheSurvey1: fieldToDistinctTheSurvey1Value,
      fieldToDistinctTheSurvey2: fieldToDistinctTheSurvey2Value,
      interviews,
      notInterviewed,
    };
  }

  // helper function for getInterviewsSettingsPage
  async getAllInterviewsExtendedFields(authHeader: string): Promise<ExtendedFields> {
    // get df2 (distinctive field 2)
    const df2 = (await this.interviewsSettingsService.get()) ?? '';

    // get extended fields for interviews
    const extendedFields = await this.retrieveSurveysDistinctiveFieldsService.retrieveAllSurveysDistinctiveFields({
      authHeader,
      settings: { fieldToDistinctTheSurvey2Value: df2 },
    });

    if (!extendedFields) {
      return {
        settings: { fieldToDistinctTheSurvey1Value: '', fieldToDistinctTheSurvey2Value: '' },
        uuidsExtended: {},
      };
    }

    // resulting in object like { 'uuid1': { survey_uuid: 'uuid1', fieldToDistinctTheSurvey1Value: 'value1', fieldToDistinctTheSurvey2Value: 'value2' }, ... }
    extendedFields.settings.fieldToDistinctTheSurvey2Value = df2;
    return extendedFields;
  }
  // helper function for getInterviewsMainPage and getInterviewsSettingsPage
  async getExistingInterviewsExtendedFields(authHeader: string): Promise<ExtendedFields> {
    // get all interviews survey_uuid
    const interviews = (await this.getInterviewColumnsToBeExtendedForMainPageGet()).map(
      ({ interviews_recruit_uuid }) => interviews_recruit_uuid,
    );

    // get df2 (distinctive field 2)
    const df2 = (await this.interviewsSettingsService.get()) ?? '';

    if (!interviews.length) {
      return {
        settings: { fieldToDistinctTheSurvey1Value: '', fieldToDistinctTheSurvey2Value: '' },
        uuidsExtended: {},
      };
    }

    // get extended fields for interviews
    const extendedFields =
      await this.retrieveSurveysDistinctiveFieldsService.retrieveSurveysDistinctiveFieldsForGivenUuids({
        authHeader,
        settings: { fieldToDistinctTheSurvey2Value: df2 },
        survey_uuids: interviews,
      });

    if (!extendedFields) {
      return {
        settings: { fieldToDistinctTheSurvey1Value: '', fieldToDistinctTheSurvey2Value: '' },
        uuidsExtended: {},
      };
    }

    // resulting in object like { 'uuid1': { survey_uuid: 'uuid1', fieldToDistinctTheSurvey1Value: 'value1', fieldToDistinctTheSurvey2Value: 'value2' }, ... }
    extendedFields.settings.fieldToDistinctTheSurvey2Value = df2;
    return extendedFields;
  }
  // helper function for getExistingInterviewsExtendedFields
  async getInterviewColumnsToBeExtendedForMainPageGet(): Promise<{ interviews_recruit_uuid: string }[]> {
    return await this.interviewsRepository
      .createQueryBuilder('interviews')
      .select(['interviews.recruit_uuid'])
      .getRawMany();
  }
}
