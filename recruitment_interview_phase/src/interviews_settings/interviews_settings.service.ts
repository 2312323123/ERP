import { Injectable } from '@nestjs/common';
import { CreateInterviewsSettingDto } from './dto/create-interviews_setting.dto';
import { UpdateInterviewsSettingDto } from './dto/update-interviews_setting.dto';

@Injectable()
export class InterviewsSettingsService {
  create(createInterviewsSettingDto: CreateInterviewsSettingDto) {
    return 'This action adds a new interviewsSetting';
  }

  findAll() {
    return `This action returns all interviewsSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interviewsSetting`;
  }

  update(id: number, updateInterviewsSettingDto: UpdateInterviewsSettingDto) {
    return `This action updates a #${id} interviewsSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} interviewsSetting`;
  }
}
