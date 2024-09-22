import { Module } from '@nestjs/common';
import { FieldsHiddenForSurveyEvaluatorsService } from './fields_hidden_for_survey_evaluators.service';
import { FieldsHiddenForSurveyEvaluatorsController } from './fields_hidden_for_survey_evaluators.controller';

@Module({
  controllers: [FieldsHiddenForSurveyEvaluatorsController],
  providers: [FieldsHiddenForSurveyEvaluatorsService],
})
export class FieldsHiddenForSurveyEvaluatorsModule {}
