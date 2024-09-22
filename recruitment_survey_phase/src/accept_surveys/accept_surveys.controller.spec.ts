import { Test, TestingModule } from '@nestjs/testing';
import { AcceptSurveysController } from './accept_surveys.controller';
import { AcceptSurveysService } from './accept_surveys.service';

describe('AcceptSurveysController', () => {
  let controller: AcceptSurveysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcceptSurveysController],
      providers: [AcceptSurveysService],
    }).compile();

    controller = module.get<AcceptSurveysController>(AcceptSurveysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
