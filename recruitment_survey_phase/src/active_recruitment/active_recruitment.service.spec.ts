import { Test, TestingModule } from '@nestjs/testing';
import { ActiveRecruitmentService } from './active_recruitment.service';

describe('ActiveRecruitmentService', () => {
  let service: ActiveRecruitmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActiveRecruitmentService],
    }).compile();

    service = module.get<ActiveRecruitmentService>(ActiveRecruitmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
