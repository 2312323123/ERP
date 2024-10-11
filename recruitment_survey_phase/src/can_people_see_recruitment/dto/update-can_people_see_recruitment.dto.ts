import { PartialType } from '@nestjs/mapped-types';
import { CreateCanPeopleSeeRecruitmentDto } from './create-can_people_see_recruitment.dto';

export class UpdateCanPeopleSeeRecruitmentDto extends PartialType(CreateCanPeopleSeeRecruitmentDto) {}
