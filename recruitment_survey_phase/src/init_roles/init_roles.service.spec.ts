import { Test, TestingModule } from '@nestjs/testing';
import { InitRolesService } from './init_roles.service';

describe('InitRolesService', () => {
  let service: InitRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitRolesService],
    }).compile();

    service = module.get<InitRolesService>(InitRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
