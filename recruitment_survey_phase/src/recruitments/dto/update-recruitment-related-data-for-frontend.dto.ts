import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruitmentRelatedDataForFrontendDto } from './create-recruitment-related-data-for-frontend.dto';

export class UpdateRecruitmentRelatedDataForFrontendDto extends PartialType(
  CreateRecruitmentRelatedDataForFrontendDto,
) {}
