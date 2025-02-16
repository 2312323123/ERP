import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationSchemasService } from './evaluation_schemas.service';

describe('EvaluationSchemasService', () => {
  let service: EvaluationSchemasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationSchemasService],
    }).compile();

    service = module.get<EvaluationSchemasService>(EvaluationSchemasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
