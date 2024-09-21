import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleAssignmentRightDto } from './create-role_assignment_right.dto';

export class UpdateRoleAssignmentRightDto extends PartialType(CreateRoleAssignmentRightDto) {}
