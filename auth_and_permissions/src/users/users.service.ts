import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Token } from 'src/tokens/entities/token.entity';
import { CreateTokenDto } from 'src/tokens/dto/create-token.dto';
// import { Token } from 'src/tokens/entities/token.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
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
    const result = await this.userRepository.delete(id);

    // Throw an error if no rows were affected (user was not found)
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
