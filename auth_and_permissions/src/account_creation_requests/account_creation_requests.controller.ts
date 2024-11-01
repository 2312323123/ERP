import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountCreationRequestsService } from './account_creation_requests.service';
import { CreateAccountCreationRequestDto } from './dto/create-account_creation_request.dto';
import { UpdateAccountCreationRequestDto } from './dto/update-account_creation_request.dto';

@Controller('account-creation-requests')
export class AccountCreationRequestsController {
  constructor(private readonly accountCreationRequestsService: AccountCreationRequestsService) {}

  // @Post()
  // create(@Body() createAccountCreationRequestDto: CreateAccountCreationRequestDto) {
  //   return this.accountCreationRequestsService.create(createAccountCreationRequestDto);
  // }

  // @Get()
  // findAll() {
  //   return this.accountCreationRequestsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.accountCreationRequestsService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountCreationRequestDto: UpdateAccountCreationRequestDto) {
  //   return this.accountCreationRequestsService.update(id, updateAccountCreationRequestDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accountCreationRequestsService.remove(id);
  // }
}
