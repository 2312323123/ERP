import { PartialType } from '@nestjs/mapped-types';
import { CreateCanEvaluateSurveyDto } from './create-can_evaluate_survey.dto';

export class UpdateCanEvaluateSurveyDto extends PartialType(CreateCanEvaluateSurveyDto) {}
