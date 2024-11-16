import { PartialType } from '@nestjs/mapped-types';
import { CreateInterviewsSettingDto } from './create-interviews_setting.dto';

export class UpdateInterviewsSettingDto extends PartialType(CreateInterviewsSettingDto) {}
