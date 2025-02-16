import { Test, TestingModule } from '@nestjs/testing';
import { SurveyMetadatasService } from './survey_metadatas.service';

describe('SurveyMetadatasService', () => {
  let service: SurveyMetadatasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyMetadatasService],
    }).compile();

    service = module.get<SurveyMetadatasService>(SurveyMetadatasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
