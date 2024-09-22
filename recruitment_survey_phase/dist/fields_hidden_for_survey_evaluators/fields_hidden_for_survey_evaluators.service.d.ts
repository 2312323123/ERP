import { CreateFieldsHiddenForSurveyEvaluatorDto } from './dto/create-fields_hidden_for_survey_evaluator.dto';
import { UpdateFieldsHiddenForSurveyEvaluatorDto } from './dto/update-fields_hidden_for_survey_evaluator.dto';
export declare class FieldsHiddenForSurveyEvaluatorsService {
    create(createFieldsHiddenForSurveyEvaluatorDto: CreateFieldsHiddenForSurveyEvaluatorDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFieldsHiddenForSurveyEvaluatorDto: UpdateFieldsHiddenForSurveyEvaluatorDto): string;
    remove(id: number): string;
}
