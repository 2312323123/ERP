import { Injectable } from '@nestjs/common';
import { CreateInterviewsSettingDto } from './dto/create-interviews_setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewsSetting } from './entities/interviews_setting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterviewsSettingsService {
  constructor(
    @InjectRepository(InterviewsSetting) private interviewsSettingRepository: Repository<InterviewsSetting>,
  ) {}
  async set({ field_to_distinct_the_survey_2 }: CreateInterviewsSettingDto) {
    if (!field_to_distinct_the_survey_2) {
      throw new Error('interviewIdentificationField2 is required');
    }

    // if table empty, create
    const interviewsSetting = await this.interviewsSettingRepository.findOne({});

    if (!interviewsSetting) {
      await this.interviewsSettingRepository.save({ field_to_distinct_the_survey_2 });
      return;
    } else {
      await this.interviewsSettingRepository.update(interviewsSetting, { field_to_distinct_the_survey_2 });
    }
  }

  async get() {
    return await this.interviewsSettingRepository.findOne({});
  }
}
