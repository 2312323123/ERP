import { Injectable } from '@nestjs/common';
import { CreateAccountCreationRequestDto } from './dto/create-account_creation_request.dto';
import { UpdateAccountCreationRequestDto } from './dto/update-account_creation_request.dto';

@Injectable()
export class AccountCreationRequestsService {
  create(createAccountCreationRequestDto: CreateAccountCreationRequestDto) {
    return 'This action adds a new accountCreationRequest';
  }

  findAll() {
    return `This action returns all accountCreationRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountCreationRequest`;
  }

  update(id: number, updateAccountCreationRequestDto: UpdateAccountCreationRequestDto) {
    return `This action updates a #${id} accountCreationRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountCreationRequest`;
  }
}
