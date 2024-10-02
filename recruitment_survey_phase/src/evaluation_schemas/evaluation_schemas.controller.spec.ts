import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationSchemasController } from './evaluation_schemas.controller';
import { EvaluationSchemasService } from './evaluation_schemas.service';

describe('EvaluationSchemasController', () => {
  let controller: EvaluationSchemasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationSchemasController],
      providers: [EvaluationSchemasService],
    }).compile();

    controller = module.get<EvaluationSchemasController>(EvaluationSchemasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
