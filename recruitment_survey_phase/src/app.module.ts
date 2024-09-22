import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyMetadatasModule } from './survey_metadatas/survey_metadatas.module';
import { ActiveRecruitmentsModule } from './active_recruitments/active_recruitments.module';
import { AcceptSurveysModule } from './accept_surveys/accept_surveys.module';
import { RecruitmentsModule } from './recruitments/recruitments.module';
import { FieldsHiddenForSurveyEvaluatorsModule } from './fields_hidden_for_survey_evaluators/fields_hidden_for_survey_evaluators.module';

@Module({
  imports: [SurveyMetadatasModule, ActiveRecruitmentsModule, AcceptSurveysModule, RecruitmentsModule, FieldsHiddenForSurveyEvaluatorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
