import { Test, TestingModule } from '@nestjs/testing';
import { AcceptsSurveysService } from './accepts_surveys.service';

describe('AcceptsSurveysService', () => {
  let service: AcceptsSurveysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcceptsSurveysService],
    }).compile();

    service = module.get<AcceptsSurveysService>(AcceptsSurveysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
