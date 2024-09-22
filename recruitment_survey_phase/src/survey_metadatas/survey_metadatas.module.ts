import { Module } from '@nestjs/common';
import { SurveyMetadatasService } from './survey_metadatas.service';
import { SurveyMetadatasController } from './survey_metadatas.controller';

@Module({
  controllers: [SurveyMetadatasController],
  providers: [SurveyMetadatasService],
})
export class SurveyMetadatasModule {}
