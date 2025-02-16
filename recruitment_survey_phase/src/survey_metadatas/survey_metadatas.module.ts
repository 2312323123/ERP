import { Module } from '@nestjs/common';
import { SurveyMetadatasService } from './survey_metadatas.service';
import { SurveyMetadatasController } from './survey_metadatas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyMetadata } from './entities/survey_metadata.entity';
import { Recruitment } from 'src/recruitments/entities/recruitment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyMetadata, Recruitment])],
  controllers: [SurveyMetadatasController],
  providers: [SurveyMetadatasService],
  exports: [SurveyMetadatasService],
})
export class SurveyMetadatasModule {}
