import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluationSchemasService } from './evaluation_schemas.service';
import { CreateEvaluationSchemaDto } from './dto/create-evaluation_schema.dto';
import { UpdateEvaluationSchemaDto } from './dto/update-evaluation_schema.dto';

@Controller('evaluation-schemas')
export class EvaluationSchemasController {
  constructor(private readonly evaluationSchemasService: EvaluationSchemasService) {}

  @Post()
  create(@Body() createEvaluationSchemaDto: CreateEvaluationSchemaDto) {
    return this.evaluationSchemasService.create(createEvaluationSchemaDto);
  }

  @Get()
  findAll() {
    return this.evaluationSchemasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationSchemasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluationSchemaDto: UpdateEvaluationSchemaDto) {
    return this.evaluationSchemasService.update(+id, updateEvaluationSchemaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationSchemasService.remove(+id);
  }
}
