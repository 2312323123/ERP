import { Module } from '@nestjs/common';
import { InterviewsSettingsService } from './interviews_settings.service';
import { InterviewsSettingsController } from './interviews_settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewsSetting } from './entities/interviews_setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewsSetting])],
  controllers: [InterviewsSettingsController],
  providers: [InterviewsSettingsService],
  exports: [InterviewsSettingsService],
})
export class InterviewsSettingsModule {}
