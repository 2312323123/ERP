import { Module } from '@nestjs/common';
import { AcceptSurveysService } from './accept_surveys.service';
import { AcceptSurveysController } from './accept_surveys.controller';

@Module({
  controllers: [AcceptSurveysController],
  providers: [AcceptSurveysService],
})
export class AcceptSurveysModule {}
