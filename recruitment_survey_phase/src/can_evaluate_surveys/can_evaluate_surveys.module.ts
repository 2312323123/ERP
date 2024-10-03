import { Module } from '@nestjs/common';
import { CanEvaluateSurveysService } from './can_evaluate_surveys.service';
import { CanEvaluateSurveysController } from './can_evaluate_surveys.controller';

@Module({
  controllers: [CanEvaluateSurveysController],
  providers: [CanEvaluateSurveysService],
})
export class CanEvaluateSurveysModule {}
