import { Test, TestingModule } from '@nestjs/testing';
import { RoleAssignmentRightsService } from './role_assignment_rights.service';

describe('RoleAssignmentRightsService', () => {
  let service: RoleAssignmentRightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleAssignmentRightsService],
    }).compile();

    service = module.get<RoleAssignmentRightsService>(RoleAssignmentRightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
