import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FieldsHiddenForSurveyEvaluatorsService } from './fields_hidden_for_survey_evaluators.service';
import { CreateFieldsHiddenForSurveyEvaluatorDto } from './dto/create-fields_hidden_for_survey_evaluator.dto';
import { UpdateFieldsHiddenForSurveyEvaluatorDto } from './dto/update-fields_hidden_for_survey_evaluator.dto';

@Controller('fields-hidden-for-survey-evaluators')
export class FieldsHiddenForSurveyEvaluatorsController {
  constructor(private readonly fieldsHiddenForSurveyEvaluatorsService: FieldsHiddenForSurveyEvaluatorsService) {}

  // @Post()
  // create(@Body() createFieldsHiddenForSurveyEvaluatorDto: CreateFieldsHiddenForSurveyEvaluatorDto) {
  //   return this.fieldsHiddenForSurveyEvaluatorsService.create(createFieldsHiddenForSurveyEvaluatorDto);
  // }

  // @Get()
  // findAll() {
  //   return this.fieldsHiddenForSurveyEvaluatorsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fieldsHiddenForSurveyEvaluatorsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFieldsHiddenForSurveyEvaluatorDto: UpdateFieldsHiddenForSurveyEvaluatorDto) {
  //   return this.fieldsHiddenForSurveyEvaluatorsService.update(+id, updateFieldsHiddenForSurveyEvaluatorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fieldsHiddenForSurveyEvaluatorsService.remove(+id);
  // }
}
