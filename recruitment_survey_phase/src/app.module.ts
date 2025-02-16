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
import { CanPeopleSeeRecruitmentModule } from './can_people_see_recruitment/can_people_see_recruitment.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { InitRolesService } from './init_roles/init_roles.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveysModule } from './surveys/surveys.module';
import { ForInterviewsModule } from './for_interviews/for_interviews.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.SURVEY_SERVICE_MONGO_USER}:${process.env.SURVEY_SERVICE_MONGO_PASSWORD}@mongo:27017/surveys_db`,
    ),
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
    CanPeopleSeeRecruitmentModule,
    JwtModule.register({
      publicKey: process.env.RSA_PUBLIC_KEY_FOR_JWT, // your public RSA key
      signOptions: {
        algorithm: 'RS256', // use RS256 algorithm
      },
    }),
    HttpModule,
    SurveysModule,
    ForInterviewsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeederService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    InitRolesService,
  ],
})
export class AppModule {}
