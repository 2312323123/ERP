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
import { RecruitmentRelatedData } from './recruitments/dto/create-recruitment-related-data-for-frontend.dto';
import { UpdateRecruitmentDto } from './recruitments/dto/update-recruitment.dto';
import { UpdateFieldsHiddenForSurveyEvaluatorDto } from './fields_hidden_for_survey_evaluators/dto/update-fields_hidden_for_survey_evaluator.dto';
import { FieldsHiddenForSurveyEvaluatorsService } from './fields_hidden_for_survey_evaluators/fields_hidden_for_survey_evaluators.service';
import { EvaluationSchemasService } from './evaluation_schemas/evaluation_schemas.service';
import { MarkGradeNamesService } from './mark_grade_names/mark_grade_names.service';
import { CreateMarkGradeNameDto } from './mark_grade_names/dto/create-mark_grade_name.dto';

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

    await Promise.all([
      Object.keys(updateRecruitmentDto).length
        ? this.recruitmentsService.updateRecruitment(uuid, updateRecruitmentDto)
        : null,
      updateFieldsHiddenForSurveyEvaluatorDto?.fields
        ? this.fieldsHiddenForSurveyEvaluatorsService.update(updateFieldsHiddenForSurveyEvaluatorDto)
        : null,
      evaluationCriteria?.length
        ? this.evaluationSchemasService.updateRecruitmentEvaluationSchemas(uuid, evaluationCriteria)
        : null,
      this.markGradeNamesService.update(markGradeNames),
    ]);
  }
}
