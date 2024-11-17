import { Test, TestingModule } from '@nestjs/testing';
import { ForInterviewsService } from './for_interviews.service';

describe('ForInterviewsService', () => {
  let service: ForInterviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForInterviewsService],
    }).compile();

    service = module.get<ForInterviewsService>(ForInterviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
