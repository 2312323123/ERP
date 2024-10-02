import { Test, TestingModule } from '@nestjs/testing';
import { ActiveRecruitmentController } from './active_recruitment.controller';
import { ActiveRecruitmentService } from './active_recruitment.service';

describe('ActiveRecruitmentController', () => {
  let controller: ActiveRecruitmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActiveRecruitmentController],
      providers: [ActiveRecruitmentService],
    }).compile();

    controller = module.get<ActiveRecruitmentController>(ActiveRecruitmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
