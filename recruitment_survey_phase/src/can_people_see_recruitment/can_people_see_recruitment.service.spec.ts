import { Test, TestingModule } from '@nestjs/testing';
import { CanPeopleSeeRecruitmentService } from './can_people_see_recruitment.service';

describe('CanPeopleSeeRecruitmentService', () => {
  let service: CanPeopleSeeRecruitmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanPeopleSeeRecruitmentService],
    }).compile();

    service = module.get<CanPeopleSeeRecruitmentService>(CanPeopleSeeRecruitmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
