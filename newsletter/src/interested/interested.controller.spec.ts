import { Test, TestingModule } from '@nestjs/testing';
import { InterestedController } from './interested.controller';
import { InterestedService } from './interested.service';

describe('InterestedController', () => {
  let controller: InterestedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestedController],
      providers: [InterestedService],
    }).compile();

    controller = module.get<InterestedController>(InterestedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
