import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFieldsHiddenForSurveyEvaluatorDto } from './dto/create-fields_hidden_for_survey_evaluator.dto';
import { UpdateFieldsHiddenForSurveyEvaluatorDto } from './dto/update-fields_hidden_for_survey_evaluator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldsHiddenForSurveyEvaluator } from './entities/fields_hidden_for_survey_evaluator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FieldsHiddenForSurveyEvaluatorsService {
  constructor(
    @InjectRepository(FieldsHiddenForSurveyEvaluator)
    private fieldsHiddenForSurveyEvaluatorRepository: Repository<FieldsHiddenForSurveyEvaluator>,
  ) {}

  // create(createFieldsHiddenForSurveyEvaluatorDto: CreateFieldsHiddenForSurveyEvaluatorDto) {
  //   return 'This action adds a new fieldsHiddenForSurveyEvaluator';
  // }

  // findAll() {
  //   return `This action returns all fieldsHiddenForSurveyEvaluators`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} fieldsHiddenForSurveyEvaluator`;
  // }

  async update(updateFieldsHiddenForSurveyEvaluatorDto: UpdateFieldsHiddenForSurveyEvaluatorDto) {
    const { recruitmentUuid, fields } = updateFieldsHiddenForSurveyEvaluatorDto;

    if (!recruitmentUuid) {
      throw new BadRequestException('No recruitment specified t598rr4');
    }

    if (!fields) {
      throw new BadRequestException('No field specified t350943');
    }

    // remove all fields for this recruitment
    this.fieldsHiddenForSurveyEvaluatorRepository.delete({ recruitment_uuid: recruitmentUuid });

    // add new fields
    for (const fieldName of fields) {
      const newField = new FieldsHiddenForSurveyEvaluator();
      newField.recruitment_uuid = recruitmentUuid;
      newField.field = fieldName;
      await this.fieldsHiddenForSurveyEvaluatorRepository.save(newField);
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} fieldsHiddenForSurveyEvaluator`;
  // }
}
