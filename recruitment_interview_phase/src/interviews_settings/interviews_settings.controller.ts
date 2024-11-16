import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterviewsSettingsService } from './interviews_settings.service';
import { CreateInterviewsSettingDto } from './dto/create-interviews_setting.dto';
import { UpdateInterviewsSettingDto } from './dto/update-interviews_setting.dto';

@Controller('interviews-settings')
export class InterviewsSettingsController {
  constructor(private readonly interviewsSettingsService: InterviewsSettingsService) {}

  @Post()
  create(@Body() createInterviewsSettingDto: CreateInterviewsSettingDto) {
    return this.interviewsSettingsService.create(createInterviewsSettingDto);
  }

  @Get()
  findAll() {
    return this.interviewsSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewsSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterviewsSettingDto: UpdateInterviewsSettingDto) {
    return this.interviewsSettingsService.update(+id, updateInterviewsSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interviewsSettingsService.remove(+id);
  }
}
