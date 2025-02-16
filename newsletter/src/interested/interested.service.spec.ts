import { Test, TestingModule } from '@nestjs/testing';
import { InterestedService } from './interested.service';

describe('InterestedService', () => {
  let service: InterestedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestedService],
    }).compile();

    service = module.get<InterestedService>(InterestedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
