import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleAssignmentRightsService } from './role_assignment_rights.service';
import { CreateRoleAssignmentRightDto } from './dto/create-role_assignment_right.dto';
import { UpdateRoleAssignmentRightDto } from './dto/update-role_assignment_right.dto';

@Controller('role-assignment-rights')
export class RoleAssignmentRightsController {
  constructor(private readonly roleAssignmentRightsService: RoleAssignmentRightsService) {}

  @Post()
  create(@Body() createRoleAssignmentRightDto: CreateRoleAssignmentRightDto) {
    return this.roleAssignmentRightsService.create(createRoleAssignmentRightDto);
  }

  @Get()
  findAll() {
    return this.roleAssignmentRightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleAssignmentRightsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleAssignmentRightDto: UpdateRoleAssignmentRightDto) {
    return this.roleAssignmentRightsService.update(+id, updateRoleAssignmentRightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleAssignmentRightsService.remove(+id);
  }
}
