import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async checkIfExists(crudService: any, role: string): Promise<boolean> {
    if (!role) {
      return false;
    }
    try {
      const result = await crudService.findOne(role);
      return Boolean(result);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return false;
      } else {
        throw new HttpException('Error fetching entity from db i68uy5y', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // if exists, 409, if doesn't, create

    // check if role exists
    let roleExists;
    try {
      roleExists = await this.checkIfExists(this, createRoleDto.role);
    } catch {
      throw new HttpException('Error fetching Role from db 5g46y7', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (roleExists) {
      // role exists
      throw new HttpException('Role exists 76t5er4', HttpStatus.CONFLICT);
    }

    const newRole = this.roleRepository.create(createRoleDto);

    return await this.roleRepository.save(newRole);
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findOne(role: string) {
    return await this.roleRepository.findOne({
      where: { role },
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
