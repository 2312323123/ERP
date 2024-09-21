import { Test, TestingModule } from '@nestjs/testing';
import { ValidJwtCachesService } from './valid_jwt_caches.service';

describe('ValidJwtCachesService', () => {
  let service: ValidJwtCachesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidJwtCachesService],
    }).compile();

    service = module.get<ValidJwtCachesService>(ValidJwtCachesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
