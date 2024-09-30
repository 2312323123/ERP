import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountCreationRequestDto } from './dto/create-account_creation_request.dto';
import { UpdateAccountCreationRequestDto } from './dto/update-account_creation_request.dto';
import { AccountCreationRequest } from './entities/account_creation_request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountCreationRequestsService {
  constructor(
    @InjectRepository(AccountCreationRequest)
    private accountCreationRequestRepository: Repository<AccountCreationRequest>,
  ) {}

  async create(createAccountCreationRequestDto: CreateAccountCreationRequestDto): Promise<AccountCreationRequest> {
    // create accountCreationRequest in DB
    const newAccountCreationRequest = this.accountCreationRequestRepository.create(createAccountCreationRequestDto);

    return await this.accountCreationRequestRepository.save(newAccountCreationRequest);
  }

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   // Create a new User instance using the CreateUserDto
  //   const newUser = this.userRepository.create(createUserDto);

  //   // Save the new user in the database
  //   return await this.userRepository.save(newUser);
  // }

  // role panel purposes
  async findAll(): Promise<AccountCreationRequest[]> {
    return await this.accountCreationRequestRepository.find();
  }

  async findOne(id: string): Promise<AccountCreationRequest> {
    const accountCreationRequest = await this.accountCreationRequestRepository.findOne({
      where: { id },
    });
    if (!accountCreationRequest) {
      throw new NotFoundException(`AccountCreationRequest with ID ${id} not found`);
    }
    return accountCreationRequest;
  }

  update(id: string, updateAccountCreationRequestDto: UpdateAccountCreationRequestDto) {
    return `This action updates a #${id} accountCreationRequest`;
  }

  async remove(id: string): Promise<void> {
    // Step 1: Find the entity by id
    const accountCreationRequest = await this.accountCreationRequestRepository.findOne({
      where: { id },
    });

    // Step 2: Throw exception if not found
    if (!accountCreationRequest) {
      throw new NotFoundException(`AccountCreationRequest with ID ${id} not found 453tr35`);
    }

    // Step 3: Remove the entity
    await this.accountCreationRequestRepository.remove(accountCreationRequest);
  }
}
