import { Module } from '@nestjs/common';
import { InterviewsSettingsService } from './interviews_settings.service';
import { InterviewsSettingsController } from './interviews_settings.controller';

@Module({
  controllers: [InterviewsSettingsController],
  providers: [InterviewsSettingsService],
})
export class InterviewsSettingsModule {}
