import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyMetadatasModule } from './survey_metadatas/survey_metadatas.module';
import { RecruitmentsModule } from './recruitments/recruitments.module';
import { FieldsHiddenForSurveyEvaluatorsModule } from './fields_hidden_for_survey_evaluators/fields_hidden_for_survey_evaluators.module';
import { ActiveRecruitmentModule } from './active_recruitment/active_recruitment.module';
import { AcceptsSurveysModule } from './accepts_surveys/accepts_surveys.module';
import { EvaluationSchemasModule } from './evaluation_schemas/evaluation_schemas.module';
import { MarksModule } from './marks/marks.module';
import { CommentsModule } from './comments/comments.module';
import { MarkGradeNamesModule } from './mark_grade_names/mark_grade_names.module';

@Module({
  imports: [
    SurveyMetadatasModule,
    RecruitmentsModule,
    FieldsHiddenForSurveyEvaluatorsModule,
    ActiveRecruitmentModule,
    AcceptsSurveysModule,
    EvaluationSchemasModule,
    MarksModule,
    CommentsModule,
    MarkGradeNamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
