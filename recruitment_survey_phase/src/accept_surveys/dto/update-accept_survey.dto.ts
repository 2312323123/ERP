import { PartialType } from '@nestjs/mapped-types';
import { CreateAcceptSurveyDto } from './create-accept_survey.dto';

export class UpdateAcceptSurveyDto extends PartialType(CreateAcceptSurveyDto) {}
