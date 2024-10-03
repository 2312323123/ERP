import { Module } from '@nestjs/common';
import { FieldsHiddenForSurveyEvaluatorsService } from './fields_hidden_for_survey_evaluators.service';
import { FieldsHiddenForSurveyEvaluatorsController } from './fields_hidden_for_survey_evaluators.controller';
import { FieldsHiddenForSurveyEvaluator } from './entities/fields_hidden_for_survey_evaluator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FieldsHiddenForSurveyEvaluator])],
  controllers: [FieldsHiddenForSurveyEvaluatorsController],
  providers: [FieldsHiddenForSurveyEvaluatorsService],
})
export class FieldsHiddenForSurveyEvaluatorsModule {}
