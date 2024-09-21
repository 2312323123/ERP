import { Test, TestingModule } from '@nestjs/testing';
import { RoleAssignmentRightsController } from './role_assignment_rights.controller';
import { RoleAssignmentRightsService } from './role_assignment_rights.service';

describe('RoleAssignmentRightsController', () => {
  let controller: RoleAssignmentRightsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleAssignmentRightsController],
      providers: [RoleAssignmentRightsService],
    }).compile();

    controller = module.get<RoleAssignmentRightsController>(RoleAssignmentRightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
