import { Test, TestingModule } from '@nestjs/testing';
import { ActiveRecruitmentsController } from './active_recruitments.controller';
import { ActiveRecruitmentsService } from './active_recruitments.service';

describe('ActiveRecruitmentsController', () => {
  let controller: ActiveRecruitmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActiveRecruitmentsController],
      providers: [ActiveRecruitmentsService],
    }).compile();

    controller = module.get<ActiveRecruitmentsController>(ActiveRecruitmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
