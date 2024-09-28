import { Test, TestingModule } from '@nestjs/testing';
import { JwtIssuerService } from './jwt_issuer.service';

describe('JwtIssuerService', () => {
  let service: JwtIssuerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtIssuerService],
    }).compile();

    service = module.get<JwtIssuerService>(JwtIssuerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
