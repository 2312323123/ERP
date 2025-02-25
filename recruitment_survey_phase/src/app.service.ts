import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ActiveRecruitmentService } from './active_recruitment/active_recruitment.service';
import { RecruitmentsService } from './recruitments/recruitments.service';
import { CanPeopleSeeRecruitmentService } from './can_people_see_recruitment/can_people_see_recruitment.service';
import { CanEvaluateSurveysService } from './can_evaluate_surveys/can_evaluate_surveys.service';
import { AcceptsSurveysService } from './accepts_surveys/accepts_surveys.service';
import { CreateAcceptsSurveyDto } from './accepts_surveys/dto/create-accepts_survey.dto';
import { CreateCanEvaluateSurveyDto } from './can_evaluate_surveys/dto/create-can_evaluate_survey.dto';
import { CreateCanPeopleSeeRecruitmentDto } from './can_people_see_recruitment/dto/create-can_people_see_recruitment.dto';
import { CreateRecruitmentDto } from './recruitments/dto/create-recruitment.dto';
import {
  RecruitmentRelatedData,
  RecruitmentRelatedDataForEvaluation,
} from './recruitments/dto/create-recruitment-related-data-for-frontend.dto';
import { UpdateRecruitmentDto } from './recruitments/dto/update-recruitment.dto';
import { UpdateFieldsHiddenForSurveyEvaluatorDto } from './fields_hidden_for_survey_evaluators/dto/update-fields_hidden_for_survey_evaluator.dto';
import { FieldsHiddenForSurveyEvaluatorsService } from './fields_hidden_for_survey_evaluators/fields_hidden_for_survey_evaluators.service';
import { EvaluationSchemasService } from './evaluation_schemas/evaluation_schemas.service';
import { MarkGradeNamesService } from './mark_grade_names/mark_grade_names.service';
import { CreateMarkGradeNameDto } from './mark_grade_names/dto/create-mark_grade_name.dto';
import { SurveysService } from './surveys/surveys.service';
import { SurveyMetadatasService } from './survey_metadatas/survey_metadatas.service';
import { Survey } from './surveys/schemas/survey.schema';
import { MarksService } from './marks/marks.service';
import { CommentsService } from './comments/comments.service';

interface SurveysStats {
  uuid: string;
  short_fields_combined: string;
  evaluated: boolean;
  identification_field_value: string;
  average_marks: undefined | number[];
  amount_of_evaluations: number;
}

export type SurveysStatsList = SurveysStats[];

function extractBearerToken(authHeader: string) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('No Bearer token found');
  }

  const token = authHeader.split(' ')[1]; // Extract the token part
  // You can now use the token for further processing, like verifying it
  return token;
}
@Injectable()
export class AppService {
  constructor(
    private readonly activeRecruitmentService: ActiveRecruitmentService,
    private readonly recruitmentsService: RecruitmentsService,
    private readonly canPeopleSeeRecruitmentService: CanPeopleSeeRecruitmentService,
    private readonly canEvaluateSurveysService: CanEvaluateSurveysService,
    private readonly acceptsSurveysService: AcceptsSurveysService,
    private readonly fieldsHiddenForSurveyEvaluatorsService: FieldsHiddenForSurveyEvaluatorsService,
    private readonly evaluationSchemasService: EvaluationSchemasService,
    private readonly markGradeNamesService: MarkGradeNamesService,
    private readonly surveysService: SurveysService,
    private readonly surveyMetadatasService: SurveyMetadatasService,
    private readonly marksService: MarksService,
    private readonly commentsService: CommentsService,
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
  async getCanPeopleSeeRecruitment(): Promise<boolean> {
    return await this.canPeopleSeeRecruitmentService.getCanPeopleSeeRecruitment();
  }
  async setCanPeopleSeeRecruitment(createCanPeopleSeeRecruitmentDto: CreateCanPeopleSeeRecruitmentDto) {
    return await this.canPeopleSeeRecruitmentService.setCanPeopleSeeRecruitment(createCanPeopleSeeRecruitmentDto);
  }

  // one switch in survey settings - can_evaluate_surveys
  async getCanEvaluateSurveys(): Promise<boolean> {
    return await this.canEvaluateSurveysService.getCanEvaluateSurveys();
  }
  async setCanEvaluateSurveys(createCanEvaluateSurveyDto: CreateCanEvaluateSurveyDto) {
    return await this.canEvaluateSurveysService.setCanEvaluateSurveys(createCanEvaluateSurveyDto);
  }

  // one switch in survey settings - accepts_surveys
  async getAcceptsSurveys(): Promise<boolean> {
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

  async setActiveRecruitment(uuid: string) {
    return this.activeRecruitmentService.setActiveRecruitment(uuid);
  }

  async saveSurveySettings(surveySettings: Partial<RecruitmentRelatedData>): Promise<void> {
    const activeRecruitmentNameUuid = await this.getActiveRecruitmentNameUuid();

    if (!activeRecruitmentNameUuid) {
      throw new Error('No active recruitment found');
    }

    const { uuid } = activeRecruitmentNameUuid;

    const updateRecruitmentDto = new UpdateRecruitmentDto();
    updateRecruitmentDto.grading_instruction = surveySettings?.gradingInstruction;
    updateRecruitmentDto.field_to_distinct_the_survey = surveySettings?.fieldToDistinctTheSurvey;

    const updateFieldsHiddenForSurveyEvaluatorDto = new UpdateFieldsHiddenForSurveyEvaluatorDto();
    updateFieldsHiddenForSurveyEvaluatorDto.recruitmentUuid = uuid;
    updateFieldsHiddenForSurveyEvaluatorDto.fields = surveySettings?.fieldsNotToShow;

    const evaluationCriteria = surveySettings?.evaluationCriteria;

    const markGradeNames = {
      recruitmentUuid: uuid,
      ...surveySettings.markTags,
    } as CreateMarkGradeNameDto;

    // to secure settings that can't be changed if there are already marks
    const anyMarkExists = await this.recruitmentsService.checkIfMarkExistsForRecruitment(uuid);

    await Promise.all([
      Object.keys(updateRecruitmentDto).length
        ? this.recruitmentsService.updateRecruitment(uuid, updateRecruitmentDto)
        : null,
      updateFieldsHiddenForSurveyEvaluatorDto?.fields
        ? this.fieldsHiddenForSurveyEvaluatorsService.update(updateFieldsHiddenForSurveyEvaluatorDto)
        : null,
      evaluationCriteria?.length && !anyMarkExists
        ? this.evaluationSchemasService.updateRecruitmentEvaluationSchemas(uuid, evaluationCriteria)
        : null,
      !anyMarkExists ? this.markGradeNamesService.update(markGradeNames) : null,
    ]);
  }

  async deleteRecruitment(uuid: string) {
    await this.recruitmentsService.delete(uuid);
  }

  async newSurvey(authHeader: string, responses: []) {
    const token = extractBearerToken(authHeader);

    // also throws if no active recruitment
    const activeRecruitmentToken = await this.activeRecruitmentService.getActiveRecruitmentToken();

    if (token !== activeRecruitmentToken) {
      throw new BadRequestException();
    }

    if (!responses.length) {
      throw new BadRequestException();
    }

    const activeRecruitmentNameUuid = await this.getActiveRecruitmentNameUuid();

    if (!activeRecruitmentNameUuid) {
      throw new BadRequestException();
    }

    // check if accepts_surveys is true
    const acceptsSurveys = await this.acceptsSurveysService.getAcceptsSurveys();

    if (!acceptsSurveys) {
      throw new BadRequestException('Surveys accepting is turned off');
    }

    const surveyMetadata = await this.surveyMetadatasService.create({
      recruitmentUuid: activeRecruitmentNameUuid.uuid,
    });

    // save the responses
    await this.surveysService.create({ uuid: surveyMetadata.uuid, responses });
  }

  async getActiveRecruitmentGradingInstruction(): Promise<{ grading_instruction: string }> {
    const activeRecruitmentNameUuid = await this.getActiveRecruitmentNameUuid();

    if (!activeRecruitmentNameUuid) {
      throw new NotFoundException('No active recruitment found');
    }

    const gradingInstruction = await this.recruitmentsService.getActiveRecruitmentDataForFrontend();

    if (!gradingInstruction) {
      throw new InternalServerErrorException('No grading instruction found');
    }

    return { grading_instruction: gradingInstruction.gradingInstruction };
  }

  async getPreviousSurveyUuid(userId: string, current_survey_uuid: string): Promise<string | null> {
    return this.surveysService.getPreviousSurveyUuid(userId, current_survey_uuid);
  }

  async getNextSurveyUuid(userId: string, current_survey_uuid: string): Promise<string | null> {
    return this.surveysService.getNextSurveyUuid(userId, current_survey_uuid);
  }

  async getEvaluationCriteria(): Promise<RecruitmentRelatedDataForEvaluation> {
    return this.recruitmentsService.getEvaluationCriteria();
  }

  async getSurvey(uuid: string): Promise<Survey> {
    return this.surveysService.getSurvey(uuid);
  }

  async getNotEvaluatedOne(userId: string): Promise<Survey | null> {
    return this.surveysService.getNotEvaluatedOne(userId);
  }

  async evaluateSurvey(userId: string, survey_uuid: string, marks: number[], comment: string) {
    return this.surveysService.evaluateSurvey(userId, survey_uuid, marks, comment);
  }

  async reEvaluateSurvey(userId: string, survey_uuid: string, marks: number[], comment: string) {
    return this.surveysService.reEvaluateSurvey(userId, survey_uuid, marks, comment);
  }

  async getAllEvaluations(userId: string, authorization: string, surveyUuid: string) {
    return this.marksService.getAllEvaluations(userId, authorization, surveyUuid);
  }

  // export type SurveysStatsList = SurveysStats[];
  // // Array<{
  // //   uuid: string;
  // //   short_fields_combined: string;
  // //   evaluated: boolean;
  // //   identification_field_value: string;
  // //   average_marks: number[];
  // // }>
  async getSurveysStatsList(userId: string): Promise<SurveysStatsList> {
    // all survey uuids for the active recruitment
    const activeRecruitmentNameUuid = await this.getActiveRecruitmentNameUuid();
    if (!activeRecruitmentNameUuid) {
      throw new NotFoundException('No active recruitment found');
    }
    const { uuid: recruitmentUuid } = activeRecruitmentNameUuid;
    const surveyIds = await this.surveyMetadatasService.getSurveyIdsForRecruitment(recruitmentUuid);
    // like [ 'uuid1', 'uuid2', ... ]

    // get whether the survey is evaluated
    const evaluated = await this.commentsService.getSurveysUuidsFromRecruitmentEvaluatedByUser(userId, recruitmentUuid);
    // like [ 'uuid1', 'uuid2', ... ]

    // get short fields combined using spaces per survey id
    const shortFieldsCombined = await this.surveysService.getShortFieldsCombined(surveyIds);
    // like { 'uuid1': 'short_fields_combined1', 'uuid2': 'short_fields_combined2', ... }

    // get identification field value per survey id
    const identificationFieldValues = await this.surveysService.getIdentificationFieldValues(surveyIds);
    // like { 'uuid1': 'identification_field_value1', 'uuid2': 'identification_field_value2', ... }

    // get average marks per survey id
    const averageMarks = await this.marksService.getAverageMarksForSurveys(surveyIds);
    // like { 'uuid1': [1, 2, 3], *no uuid2 at all*, 'uuid3': [4, 5, 6], ... }

    // get amount of evaluations per survey id
    const amountOfEvaluations = await this.commentsService.getAmountOfEvaluationsForSurveys(surveyIds);
    // like { 'uuid1': 3, 'uuid2': 0, 'uuid3': 2, ... }

    // merge
    const myObj: { [key: string]: Partial<SurveysStats> } = {};
    surveyIds.forEach((uuid) => (myObj[uuid] = { uuid, evaluated: false }));
    evaluated.forEach((uuid) => (myObj[uuid].evaluated = true));
    surveyIds.forEach((uuid) => (myObj[uuid].short_fields_combined = shortFieldsCombined[uuid]));
    surveyIds.forEach((uuid) => (myObj[uuid].identification_field_value = identificationFieldValues[uuid]));
    surveyIds.forEach((uuid) => (myObj[uuid].average_marks = averageMarks[uuid]));
    surveyIds.forEach((uuid) => (myObj[uuid].amount_of_evaluations = amountOfEvaluations[uuid] ?? 0));

    // convert to array
    return Object.values(myObj as { [key: string]: SurveysStats });
  }
}
