import { Test, TestingModule } from '@nestjs/testing';
import { CanPeopleSeeRecruitmentController } from './can_people_see_recruitment.controller';
import { CanPeopleSeeRecruitmentService } from './can_people_see_recruitment.service';

describe('CanPeopleSeeRecruitmentController', () => {
  let controller: CanPeopleSeeRecruitmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CanPeopleSeeRecruitmentController],
      providers: [CanPeopleSeeRecruitmentService],
    }).compile();

    controller = module.get<CanPeopleSeeRecruitmentController>(CanPeopleSeeRecruitmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
