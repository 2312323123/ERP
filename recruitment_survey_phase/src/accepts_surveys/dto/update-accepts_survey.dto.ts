import { PartialType } from '@nestjs/mapped-types';
import { CreateAcceptsSurveyDto } from './create-accepts_survey.dto';

export class UpdateAcceptsSurveyDto extends PartialType(CreateAcceptsSurveyDto) {}
