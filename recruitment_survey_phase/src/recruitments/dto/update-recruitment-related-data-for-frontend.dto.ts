import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruitmentRelatedDataForFrontendDto } from './create-recruitment-related-data-for-frontend.dto copy';

export class UpdateRecruitmentRelatedDataForFrontendDto extends PartialType(
  CreateRecruitmentRelatedDataForFrontendDto,
) {}
