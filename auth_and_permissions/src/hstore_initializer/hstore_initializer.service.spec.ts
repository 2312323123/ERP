import { Test, TestingModule } from '@nestjs/testing';
import { HstoreInitializerService } from './hstore_initializer.service';

describe('HstoreInitializerService', () => {
  let service: HstoreInitializerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HstoreInitializerService],
    }).compile();

    service = module.get<HstoreInitializerService>(HstoreInitializerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
