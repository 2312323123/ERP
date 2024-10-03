import { Injectable } from '@nestjs/common';
import { CreateEvaluationSchemaDto } from './dto/create-evaluation_schema.dto';
import { UpdateEvaluationSchemaDto } from './dto/update-evaluation_schema.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluationSchema } from './entities/evaluation_schema.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluationSchemasService {
  constructor(@InjectRepository(EvaluationSchema) evaluationSchemaRepository: Repository<EvaluationSchema>) {}

  create(createEvaluationSchemaDto: CreateEvaluationSchemaDto) {
    return 'This action adds a new evaluationSchema';
  }

  findAll() {
    return `This action returns all evaluationSchemas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evaluationSchema`;
  }

  update(id: number, updateEvaluationSchemaDto: UpdateEvaluationSchemaDto) {
    return `This action updates a #${id} evaluationSchema`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluationSchema`;
  }
}
