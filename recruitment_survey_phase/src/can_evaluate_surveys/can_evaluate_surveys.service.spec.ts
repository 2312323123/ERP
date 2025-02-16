import { Test, TestingModule } from '@nestjs/testing';
import { CanEvaluateSurveysService } from './can_evaluate_surveys.service';

describe('CanEvaluateSurveysService', () => {
  let service: CanEvaluateSurveysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanEvaluateSurveysService],
    }).compile();

    service = module.get<CanEvaluateSurveysService>(CanEvaluateSurveysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
