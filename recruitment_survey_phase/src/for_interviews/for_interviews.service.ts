import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { ActiveRecruitmentService } from 'src/active_recruitment/active_recruitment.service';
import { RecruitmentsService } from 'src/recruitments/recruitments.service';
import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';
import { Survey } from 'src/surveys/schemas/survey.schema';
import { Repository } from 'typeorm';

interface GivenUuidsProps {
  settings: { fieldToDistinctTheSurvey2Value: string };
  survey_uuids?: string[];
}

export interface ReturnType {
  settings: { fieldToDistinctTheSurvey1Value: string };
  uuidsExtended: {
    [survey_uuid: string]: {
      survey_uuid: string;
      df1: any;
      df2: any;
    };
  };
}

@Injectable()
export class ForInterviewsService {
  constructor(
    private readonly activeRecruitmentService: ActiveRecruitmentService,
    @InjectRepository(SurveyMetadata) private surveyMetadataRepository: Repository<SurveyMetadata>,
    private readonly recruitmentsService: RecruitmentsService,
    @InjectModel(Survey.name) private surveyModel: Model<Survey>,
  ) {}

  async getRecruitsDistinctFields({
    settings: { fieldToDistinctTheSurvey2Value },
    survey_uuids: surveyUuids,
  }: GivenUuidsProps): Promise<ReturnType> {
    const activeRecruitmentUuid = await this.activeRecruitmentService.getActiveRecruitmentUuid();

    if (!activeRecruitmentUuid) {
      throw new NotFoundException('No active recruitment found');
    }

    // get the other identification field name
    const fieldToDistinctTheSurvey1Value = await this.recruitmentsService.getFieldToDistinctTheSurvey();

    if (surveyUuids?.length === 0) {
      return {
        settings: { fieldToDistinctTheSurvey1Value },
        uuidsExtended: {},
      };
    }

    const result = await this.surveyMetadataRepository
      .createQueryBuilder('survey_metadata')
      .select('survey_metadata.uuid')
      .innerJoin('survey_metadata.recruitment', 'recruitment')
      .where('recruitment.uuid = :activeRecruitmentUuid', { activeRecruitmentUuid })
      .andWhere(Array.isArray(surveyUuids) ? 'survey_metadata.uuid IN (:...surveyUuids)' : '1=1', { surveyUuids })
      .getMany();

    const uuidsToExtend = result.map((metadata: { uuid: string }) => metadata.uuid);

    // get the indexes of fieldToDistinctTheSurvey1Value and fieldToDistinctTheSurvey2Value
    const questionIndexes = await this.getQuestionIndexes(uuidsToExtend[0], [
      fieldToDistinctTheSurvey1Value,
      fieldToDistinctTheSurvey2Value,
    ]);

    // create the extended object to return
    const distinctiveFields = await this.getDistinctiveFieldsForSurveys(
      uuidsToExtend,
      questionIndexes as [number, number],
    );

    // 'df' stands for 'distinctive field'
    return {
      settings: { fieldToDistinctTheSurvey1Value },
      uuidsExtended: distinctiveFields,
    };
  }

  // utility function used in getRecruitsDistinctFields
  async getQuestionIndexes(surveyUuid: string, questions: [string, string]): Promise<number[]> {
    const survey = await this.surveyModel.findOne({ uuid: surveyUuid }).exec();

    if (!survey) {
      return [-1, -1];
    }

    const indexes: number[] = [];

    questions.forEach((question) => {
      const index = survey.responses.findIndex((response) => response.question === question);
      if (index !== -1) {
        indexes.push(index);
      } else {
        // If a question is not found, push `-1` or handle as needed
        indexes.push(-1);
      }
    });

    return indexes;
  }
  // utility function used in getRecruitsDistinctFields
  async getDistinctiveFieldsForSurveys(
    uuids: string[],
    questionIndexes: [number, number],
  ): Promise<Record<string, { survey_uuid: string; df1: any; df2: any }>> {
    // Fetch surveys with matching UUIDs
    const surveys = await this.surveyModel.find({ uuid: { $in: uuids } }).exec();

    // Transform into the desired output format
    const result: Record<string, { survey_uuid: string; df1: any; df2: any }> = {};

    surveys.forEach((survey) => {
      const df1 = survey.responses[questionIndexes[0]]?.answer ?? null;
      const df2 = survey.responses[questionIndexes[1]]?.answer ?? null;

      result[survey.uuid] = {
        survey_uuid: survey.uuid,
        df1,
        df2,
      };
    });

    return result;
  }
}
