import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Token } from 'src/tokens/entities/token.entity';
import { CreateTokenDto } from 'src/tokens/dto/create-token.dto';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Create a new User instance using the CreateUserDto
    const newUser = this.userRepository.create(createUserDto);
    // const newUserTokens;

    const tokensDto = new CreateTokenDto(createUserDto.id);
    const tokens = this.tokenRepository.create(tokensDto);

    // Save the new user in the
    const newUserMaybe = await this.userRepository.save(newUser);
    await this.tokenRepository.save(tokens);
    return newUserMaybe;
  }

  findAll() {
    // return `This action returns all users`;
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    if (!id) {
      throw new BadRequestException('Invalid data i676yt4r');
    }

    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Update a user's data by ID
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!id) {
      throw new BadRequestException('Invalid data 3e4er4t56');
    }

    const user = await this.userRepository.findOne({ where: { id } });

    // Throw an error if the user is not found
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Merge the new data with the existing user
    const updatedUser = this.userRepository.merge(user, updateUserDto);

    // Save the updated user to the database
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid data u6y6t5re');
    }

    const result = await this.userRepository.delete(id);

    // Throw an error if no rows were affected (user was not found)
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async getUserRolesById(id: string): Promise<Role[]> {
    if (!id) {
      throw new BadRequestException('Invalid data u665tr43');
    }

    // Fetch the user by ID and include roles
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'], // Load the roles relation
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.roles; // Return the user's roles
  }

  // role panel purposes
  async assignRoleToUser(id: string, roleName: string): Promise<void> {
    if (!id || !roleName) {
      throw new BadRequestException('Invalid data 4r3ty65t');
    }

    // Find the user by ID
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'], // Ensure roles are loaded
    });

    if (!user) {
      throw new NotFoundException('User not found 4r2t344');
    }

    // Find the role by name (or however you want to find the role)
    const role = await this.roleRepository.findOne({ where: { role: roleName } });

    if (!role) {
      throw new NotFoundException('Role not found 6y55tre4r');
    }

    // Add the role to the user's roles array if it doesn't exist
    if (!user.roles.some((r) => r.role === role.role)) {
      user.roles.push(role);
    }

    await this.userRepository.save(user);

    // Save the updated user entity
    return;
  }

  // role panel purposes
  async removeRoleFromUser(id: string, roleName: string): Promise<void> {
    if (!id || !roleName) {
      throw new BadRequestException('Invalid data 7iu7y6t');
    }

    // Find the user by ID
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'], // Ensure roles are loaded
    });

    if (!user) {
      throw new NotFoundException('User not found 5r46y4334');
    }

    // Find the role by name
    const role = await this.roleRepository.findOne({ where: { role: roleName } });

    if (!role) {
      throw new NotFoundException('Role not found r42e4r5t5');
    }

    // Check if the user has the role, then remove it
    const roleIndex = user.roles.findIndex((r) => r.role === role.role);
    if (roleIndex !== -1) {
      user.roles.splice(roleIndex, 1); // Remove the role from the user's roles array
    } else {
      throw new NotFoundException(`Role not assigned to the user ${id} r6yu554t`); // DUPA
    }

    // Save the updated user entity
    await this.userRepository.save(user);

    return;
  }

  // role panel purposes
  async getUsersWithTheirRoles(): Promise<User[]> {
    return this.userRepository.find({ relations: ['roles'] });
  }
}
