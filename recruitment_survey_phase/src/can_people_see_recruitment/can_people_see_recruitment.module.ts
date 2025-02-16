import { Module } from '@nestjs/common';
import { CanPeopleSeeRecruitmentService } from './can_people_see_recruitment.service';
import { CanPeopleSeeRecruitmentController } from './can_people_see_recruitment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanPeopleSeeRecruitment } from './entities/can_people_see_recruitment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CanPeopleSeeRecruitment])],
  controllers: [CanPeopleSeeRecruitmentController],
  providers: [CanPeopleSeeRecruitmentService],
  exports: [TypeOrmModule, CanPeopleSeeRecruitmentService],
})
export class CanPeopleSeeRecruitmentModule {}
