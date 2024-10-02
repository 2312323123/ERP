import { Module } from '@nestjs/common';
import { ActiveRecruitmentService } from './active_recruitment.service';
import { ActiveRecruitmentController } from './active_recruitment.controller';

@Module({
  controllers: [ActiveRecruitmentController],
  providers: [ActiveRecruitmentService],
})
export class ActiveRecruitmentModule {}
