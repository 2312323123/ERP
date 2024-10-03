import { Module } from '@nestjs/common';
import { SurveyMetadatasService } from './survey_metadatas.service';
import { SurveyMetadatasController } from './survey_metadatas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyMetadata } from './entities/survey_metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyMetadata])],
  controllers: [SurveyMetadatasController],
  providers: [SurveyMetadatasService],
})
export class SurveyMetadatasModule {}
