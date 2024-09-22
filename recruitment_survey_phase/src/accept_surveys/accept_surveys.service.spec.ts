import { Test, TestingModule } from '@nestjs/testing';
import { AcceptSurveysService } from './accept_surveys.service';

describe('AcceptSurveysService', () => {
  let service: AcceptSurveysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcceptSurveysService],
    }).compile();

    service = module.get<AcceptSurveysService>(AcceptSurveysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
