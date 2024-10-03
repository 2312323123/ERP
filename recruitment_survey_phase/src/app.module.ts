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
import { SeederService } from './seeder/seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanEvaluateSurveysModule } from './can_evaluate_surveys/can_evaluate_surveys.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_PSQL_SERVICE_NAME,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SurveyMetadatasModule,
    RecruitmentsModule,
    FieldsHiddenForSurveyEvaluatorsModule,
    ActiveRecruitmentModule,
    AcceptsSurveysModule,
    EvaluationSchemasModule,
    MarksModule,
    CommentsModule,
    MarkGradeNamesModule,
    CanEvaluateSurveysModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
