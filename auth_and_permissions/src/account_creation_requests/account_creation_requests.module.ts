import { Module } from '@nestjs/common';
import { AccountCreationRequestsService } from './account_creation_requests.service';
import { AccountCreationRequestsController } from './account_creation_requests.controller';

@Module({
  controllers: [AccountCreationRequestsController],
  providers: [AccountCreationRequestsService],
})
export class AccountCreationRequestsModule {}
