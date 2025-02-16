import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { checkIfExists } from 'src/app.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // if exists, 409, if doesn't, create

    // check if role exists
    let roleExists;
    try {
      roleExists = await checkIfExists(this, createRoleDto.role, '359ff8');
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

  // role panel purposes
  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(role: string) {
    return await this.roleRepository.findOne({
      where: { role },
    });
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }
}
