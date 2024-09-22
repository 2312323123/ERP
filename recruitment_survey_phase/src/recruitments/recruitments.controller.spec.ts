import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentsController } from './recruitments.controller';
import { RecruitmentsService } from './recruitments.service';

describe('RecruitmentsController', () => {
  let controller: RecruitmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitmentsController],
      providers: [RecruitmentsService],
    }).compile();

    controller = module.get<RecruitmentsController>(RecruitmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
