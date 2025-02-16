import { Test, TestingModule } from '@nestjs/testing';
import { InterviewsSettingsService } from './interviews_settings.service';

describe('InterviewsSettingsService', () => {
  let service: InterviewsSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterviewsSettingsService],
    }).compile();

    service = module.get<InterviewsSettingsService>(InterviewsSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
