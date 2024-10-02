import { Module } from '@nestjs/common';
import { EvaluationSchemasService } from './evaluation_schemas.service';
import { EvaluationSchemasController } from './evaluation_schemas.controller';

@Module({
  controllers: [EvaluationSchemasController],
  providers: [EvaluationSchemasService],
})
export class EvaluationSchemasModule {}
