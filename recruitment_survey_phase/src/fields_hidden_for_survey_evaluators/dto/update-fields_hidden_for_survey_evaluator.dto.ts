import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldsHiddenForSurveyEvaluatorDto } from './create-fields_hidden_for_survey_evaluator.dto';

export class UpdateFieldsHiddenForSurveyEvaluatorDto extends PartialType(CreateFieldsHiddenForSurveyEvaluatorDto) {}
