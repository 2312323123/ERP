import { Module } from '@nestjs/common';
import { RecruitmentsService } from './recruitments.service';
import { RecruitmentsController } from './recruitments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { ActiveRecruitment } from 'src/active_recruitment/entities/active_recruitment.entity';
import { MarkGradeName } from 'src/mark_grade_names/entities/mark_grade_name.entity';
import { FieldsHiddenForSurveyEvaluator } from 'src/fields_hidden_for_survey_evaluators/entities/fields_hidden_for_survey_evaluator.entity';
import { EvaluationSchema } from 'src/evaluation_schemas/entities/evaluation_schema.entity';
import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';
import { Mark } from 'src/marks/entities/mark.entity';
import { EvaluationSchemasService } from 'src/evaluation_schemas/evaluation_schemas.service';
import { MarkGradeNamesService } from 'src/mark_grade_names/mark_grade_names.service';
import { CanEvaluateSurveysService } from 'src/can_evaluate_surveys/can_evaluate_surveys.service';
import { CanPeopleSeeRecruitmentService } from 'src/can_people_see_recruitment/can_people_see_recruitment.service';
import { CanEvaluateSurvey } from 'src/can_evaluate_surveys/entities/can_evaluate_survey.entity';
import { CanPeopleSeeRecruitment } from 'src/can_people_see_recruitment/entities/can_people_see_recruitment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recruitment,
      ActiveRecruitment,
      MarkGradeName,
      FieldsHiddenForSurveyEvaluator,
      EvaluationSchema,
      Mark,
      SurveyMetadata,
      CanEvaluateSurvey,
      CanPeopleSeeRecruitment,
    ]),
  ],
  controllers: [RecruitmentsController],
  providers: [
    RecruitmentsService,
    EvaluationSchemasService,
    MarkGradeNamesService,
    CanEvaluateSurveysService,
    CanPeopleSeeRecruitmentService,
  ],
  exports: [RecruitmentsService],
})
export class RecruitmentsModule {}
