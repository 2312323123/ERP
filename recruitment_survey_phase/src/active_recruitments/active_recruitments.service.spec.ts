import { Test, TestingModule } from '@nestjs/testing';
import { ActiveRecruitmentsService } from './active_recruitments.service';

describe('ActiveRecruitmentsService', () => {
  let service: ActiveRecruitmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActiveRecruitmentsService],
    }).compile();

    service = module.get<ActiveRecruitmentsService>(ActiveRecruitmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
