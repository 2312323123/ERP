import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluationSchemaDto } from './create-evaluation_schema.dto';

export class UpdateEvaluationSchemaDto extends PartialType(CreateEvaluationSchemaDto) {}
