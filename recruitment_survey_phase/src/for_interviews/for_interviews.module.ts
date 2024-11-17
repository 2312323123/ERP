import { Module } from '@nestjs/common';
import { ForInterviewsService } from './for_interviews.service';
import { ActiveRecruitmentModule } from 'src/active_recruitment/active_recruitment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';
import { RecruitmentsModule } from 'src/recruitments/recruitments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from 'src/surveys/schemas/survey.schema';

@Module({
  imports: [
    ActiveRecruitmentModule,
    TypeOrmModule.forFeature([SurveyMetadata]),
    RecruitmentsModule,
    MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }]),
  ],
  providers: [ForInterviewsService],
  exports: [ForInterviewsService],
})
export class ForInterviewsModule {}
