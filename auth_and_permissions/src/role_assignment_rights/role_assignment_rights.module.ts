import { Module } from '@nestjs/common';
import { RoleAssignmentRightsService } from './role_assignment_rights.service';
import { RoleAssignmentRightsController } from './role_assignment_rights.controller';

@Module({
  controllers: [RoleAssignmentRightsController],
  providers: [RoleAssignmentRightsService],
})
export class RoleAssignmentRightsModule {}
