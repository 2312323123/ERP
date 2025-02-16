import { Test, TestingModule } from '@nestjs/testing';
import { FieldsHiddenForSurveyEvaluatorsController } from './fields_hidden_for_survey_evaluators.controller';
import { FieldsHiddenForSurveyEvaluatorsService } from './fields_hidden_for_survey_evaluators.service';

describe('FieldsHiddenForSurveyEvaluatorsController', () => {
  let controller: FieldsHiddenForSurveyEvaluatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldsHiddenForSurveyEvaluatorsController],
      providers: [FieldsHiddenForSurveyEvaluatorsService],
    }).compile();

    controller = module.get<FieldsHiddenForSurveyEvaluatorsController>(FieldsHiddenForSurveyEvaluatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
