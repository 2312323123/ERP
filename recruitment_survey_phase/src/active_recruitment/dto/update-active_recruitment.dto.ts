import { PartialType } from '@nestjs/mapped-types';
import { CreateActiveRecruitmentDto } from './create-active_recruitment.dto';

export class UpdateActiveRecruitmentDto extends PartialType(CreateActiveRecruitmentDto) {}
