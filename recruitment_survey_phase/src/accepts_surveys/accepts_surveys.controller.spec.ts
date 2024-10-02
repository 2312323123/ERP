import { Test, TestingModule } from '@nestjs/testing';
import { AcceptsSurveysController } from './accepts_surveys.controller';
import { AcceptsSurveysService } from './accepts_surveys.service';

describe('AcceptsSurveysController', () => {
  let controller: AcceptsSurveysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcceptsSurveysController],
      providers: [AcceptsSurveysService],
    }).compile();

    controller = module.get<AcceptsSurveysController>(AcceptsSurveysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
