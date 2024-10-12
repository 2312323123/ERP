import { Module } from '@nestjs/common';
import { AcceptsSurveysService } from './accepts_surveys.service';
import { AcceptsSurveysController } from './accepts_surveys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcceptsSurvey } from './entities/accepts_survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcceptsSurvey])],
  controllers: [AcceptsSurveysController],
  providers: [AcceptsSurveysService],
  exports: [TypeOrmModule, AcceptsSurveysService],
})
export class AcceptsSurveysModule {}
