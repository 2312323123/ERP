import { Module } from '@nestjs/common';
import { EvaluationSchemasService } from './evaluation_schemas.service';
import { EvaluationSchemasController } from './evaluation_schemas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationSchema } from './entities/evaluation_schema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationSchema])],
  controllers: [EvaluationSchemasController],
  providers: [EvaluationSchemasService],
})
export class EvaluationSchemasModule {}
