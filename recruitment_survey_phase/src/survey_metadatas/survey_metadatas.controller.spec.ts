import { Test, TestingModule } from '@nestjs/testing';
import { SurveyMetadatasController } from './survey_metadatas.controller';
import { SurveyMetadatasService } from './survey_metadatas.service';

describe('SurveyMetadatasController', () => {
  let controller: SurveyMetadatasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyMetadatasController],
      providers: [SurveyMetadatasService],
    }).compile();

    controller = module.get<SurveyMetadatasController>(SurveyMetadatasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
