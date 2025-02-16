import { PartialType } from '@nestjs/mapped-types';
import { CreateInterviewDto } from './create-interview.dto';

export class UpdateInterviewDto extends PartialType(CreateInterviewDto) {
  interviewer_review?: string;
  helper_1_review?: string;
  helper_2_review?: string;
}
