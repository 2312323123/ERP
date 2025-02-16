import { Test, TestingModule } from '@nestjs/testing';
import { AccountCreationRequestsService } from './account_creation_requests.service';

describe('AccountCreationRequestsService', () => {
  let service: AccountCreationRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountCreationRequestsService],
    }).compile();

    service = module.get<AccountCreationRequestsService>(AccountCreationRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
