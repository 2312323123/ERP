import { Injectable } from '@nestjs/common';
import { CreateEvaluationSchemaDto } from './dto/create-evaluation_schema.dto';
// import { UpdateEvaluationSchemaDto } from './dto/update-evaluation_schema.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluationSchema } from './entities/evaluation_schema.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluationSchemasService {
  constructor(@InjectRepository(EvaluationSchema) private evaluationSchemaRepository: Repository<EvaluationSchema>) {}

  async createRecruitmentEvaluationSchemas(uuid: string, createEvaluationSchemaDtos: Array<CreateEvaluationSchemaDto>) {
    for (const [index, criterion] of createEvaluationSchemaDtos.entries()) {
      const evaluationSchema = new EvaluationSchema();
      evaluationSchema.recruitment_uuid = uuid;
      evaluationSchema.order = index;
      evaluationSchema.name = criterion.name;
      evaluationSchema.description = criterion.description;
      evaluationSchema.weight = criterion.weight;
      await this.evaluationSchemaRepository.save(evaluationSchema);
    }
  }

  async deleteAllRecruitmentEvaluationSchemas(uuid: string) {
    await this.evaluationSchemaRepository.delete({ recruitment_uuid: uuid });
  }

  // findAll() {
  //   return `This action returns all evaluationSchemas`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} evaluationSchema`;
  // }

  async updateRecruitmentEvaluationSchemas(uuid: string, updateEvaluationSchemaDtos: Array<CreateEvaluationSchemaDto>) {
    this.deleteAllRecruitmentEvaluationSchemas(uuid);
    this.createRecruitmentEvaluationSchemas(uuid, updateEvaluationSchemaDtos);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} evaluationSchema`;
  // }
}
