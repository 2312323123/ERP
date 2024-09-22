import { Test, TestingModule } from '@nestjs/testing';
import { FieldsHiddenForSurveyEvaluatorsService } from './fields_hidden_for_survey_evaluators.service';

describe('FieldsHiddenForSurveyEvaluatorsService', () => {
  let service: FieldsHiddenForSurveyEvaluatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldsHiddenForSurveyEvaluatorsService],
    }).compile();

    service = module.get<FieldsHiddenForSurveyEvaluatorsService>(FieldsHiddenForSurveyEvaluatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
