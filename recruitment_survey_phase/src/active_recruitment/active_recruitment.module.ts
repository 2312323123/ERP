import { Module } from '@nestjs/common';
import { ActiveRecruitmentService } from './active_recruitment.service';
import { ActiveRecruitmentController } from './active_recruitment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveRecruitment } from './entities/active_recruitment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActiveRecruitment])],
  controllers: [ActiveRecruitmentController],
  providers: [ActiveRecruitmentService],
})
export class ActiveRecruitmentModule {}
