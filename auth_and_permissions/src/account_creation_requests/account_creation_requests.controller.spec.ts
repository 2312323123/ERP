import { Test, TestingModule } from '@nestjs/testing';
import { AccountCreationRequestsController } from './account_creation_requests.controller';
import { AccountCreationRequestsService } from './account_creation_requests.service';

describe('AccountCreationRequestsController', () => {
  let controller: AccountCreationRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountCreationRequestsController],
      providers: [AccountCreationRequestsService],
    }).compile();

    controller = module.get<AccountCreationRequestsController>(AccountCreationRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
