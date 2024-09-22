import { Injectable } from '@nestjs/common';
import { CreateFieldsHiddenForSurveyEvaluatorDto } from './dto/create-fields_hidden_for_survey_evaluator.dto';
import { UpdateFieldsHiddenForSurveyEvaluatorDto } from './dto/update-fields_hidden_for_survey_evaluator.dto';

@Injectable()
export class FieldsHiddenForSurveyEvaluatorsService {
  create(createFieldsHiddenForSurveyEvaluatorDto: CreateFieldsHiddenForSurveyEvaluatorDto) {
    return 'This action adds a new fieldsHiddenForSurveyEvaluator';
  }

  findAll() {
    return `This action returns all fieldsHiddenForSurveyEvaluators`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fieldsHiddenForSurveyEvaluator`;
  }

  update(id: number, updateFieldsHiddenForSurveyEvaluatorDto: UpdateFieldsHiddenForSurveyEvaluatorDto) {
    return `This action updates a #${id} fieldsHiddenForSurveyEvaluator`;
  }

  remove(id: number) {
    return `This action removes a #${id} fieldsHiddenForSurveyEvaluator`;
  }
}
