import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './schemas/survey.schema';
import { MarksService } from 'src/marks/marks.service';
import { CommentsService } from 'src/comments/comments.service';
import { CanEvaluateSurveysService } from 'src/can_evaluate_surveys/can_evaluate_surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';
import { ActiveRecruitment } from 'src/active_recruitment/entities/active_recruitment.entity';
import { Mark } from 'src/marks/entities/mark.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CanEvaluateSurvey } from 'src/can_evaluate_surveys/entities/can_evaluate_survey.entity';
import { EvaluationSchema } from 'src/evaluation_schemas/entities/evaluation_schema.entity';
import { EvaluationSchemasService } from 'src/evaluation_schemas/evaluation_schemas.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }]),
    TypeOrmModule.forFeature([SurveyMetadata, ActiveRecruitment, Mark, Comment, CanEvaluateSurvey, EvaluationSchema]),
  ],
  controllers: [SurveysController],
  providers: [SurveysService, MarksService, CommentsService, CanEvaluateSurveysService, EvaluationSchemasService],
  exports: [SurveysService],
})
export class SurveysModule {}
