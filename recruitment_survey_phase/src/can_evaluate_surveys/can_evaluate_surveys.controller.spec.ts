import { Test, TestingModule } from '@nestjs/testing';
import { CanEvaluateSurveysController } from './can_evaluate_surveys.controller';
import { CanEvaluateSurveysService } from './can_evaluate_surveys.service';

describe('CanEvaluateSurveysController', () => {
  let controller: CanEvaluateSurveysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CanEvaluateSurveysController],
      providers: [CanEvaluateSurveysService],
    }).compile();

    controller = module.get<CanEvaluateSurveysController>(CanEvaluateSurveysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
