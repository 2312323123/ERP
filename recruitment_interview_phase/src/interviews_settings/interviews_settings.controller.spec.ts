import { Test, TestingModule } from '@nestjs/testing';
import { InterviewsSettingsController } from './interviews_settings.controller';
import { InterviewsSettingsService } from './interviews_settings.service';

describe('InterviewsSettingsController', () => {
  let controller: InterviewsSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewsSettingsController],
      providers: [InterviewsSettingsService],
    }).compile();

    controller = module.get<InterviewsSettingsController>(InterviewsSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
