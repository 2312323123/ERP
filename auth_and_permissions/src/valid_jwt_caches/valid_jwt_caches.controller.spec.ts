import { Test, TestingModule } from '@nestjs/testing';
import { ValidJwtCachesController } from './valid_jwt_caches.controller';
import { ValidJwtCachesService } from './valid_jwt_caches.service';

describe('ValidJwtCachesController', () => {
  let controller: ValidJwtCachesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidJwtCachesController],
      providers: [ValidJwtCachesService],
    }).compile();

    controller = module.get<ValidJwtCachesController>(ValidJwtCachesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
