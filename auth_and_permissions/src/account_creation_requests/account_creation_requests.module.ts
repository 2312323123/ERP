import { Module } from '@nestjs/common';
import { AccountCreationRequestsService } from './account_creation_requests.service';
import { AccountCreationRequestsController } from './account_creation_requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountCreationRequest } from './entities/account_creation_request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountCreationRequest])],
  controllers: [AccountCreationRequestsController],
  providers: [AccountCreationRequestsService],
  exports: [AccountCreationRequestsService],
})
export class AccountCreationRequestsModule {}
