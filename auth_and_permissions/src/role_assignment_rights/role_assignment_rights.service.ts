import { Injectable } from '@nestjs/common';
import { CreateRoleAssignmentRightDto } from './dto/create-role_assignment_right.dto';
import { UpdateRoleAssignmentRightDto } from './dto/update-role_assignment_right.dto';

@Injectable()
export class RoleAssignmentRightsService {
  create(createRoleAssignmentRightDto: CreateRoleAssignmentRightDto) {
    return 'This action adds a new roleAssignmentRight';
  }

  findAll() {
    return `This action returns all roleAssignmentRights`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleAssignmentRight`;
  }

  update(id: number, updateRoleAssignmentRightDto: UpdateRoleAssignmentRightDto) {
    return `This action updates a #${id} roleAssignmentRight`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleAssignmentRight`;
  }
}
