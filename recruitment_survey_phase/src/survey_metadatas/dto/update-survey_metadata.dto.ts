import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyMetadataDto } from './create-survey_metadata.dto';

export class UpdateSurveyMetadataDto extends PartialType(CreateSurveyMetadataDto) {}
