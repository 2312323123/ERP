import { Module } from '@nestjs/common';
import { CanEvaluateSurveysService } from './can_evaluate_surveys.service';
import { CanEvaluateSurveysController } from './can_evaluate_surveys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanEvaluateSurvey } from './entities/can_evaluate_survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CanEvaluateSurvey])],
  controllers: [CanEvaluateSurveysController],
  providers: [CanEvaluateSurveysService],
})
export class CanEvaluateSurveysModule {}
