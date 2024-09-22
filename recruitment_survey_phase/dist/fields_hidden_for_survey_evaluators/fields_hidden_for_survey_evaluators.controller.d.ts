import { FieldsHiddenForSurveyEvaluatorsService } from './fields_hidden_for_survey_evaluators.service';
import { CreateFieldsHiddenForSurveyEvaluatorDto } from './dto/create-fields_hidden_for_survey_evaluator.dto';
import { UpdateFieldsHiddenForSurveyEvaluatorDto } from './dto/update-fields_hidden_for_survey_evaluator.dto';
export declare class FieldsHiddenForSurveyEvaluatorsController {
    private readonly fieldsHiddenForSurveyEvaluatorsService;
    constructor(fieldsHiddenForSurveyEvaluatorsService: FieldsHiddenForSurveyEvaluatorsService);
    create(createFieldsHiddenForSurveyEvaluatorDto: CreateFieldsHiddenForSurveyEvaluatorDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFieldsHiddenForSurveyEvaluatorDto: UpdateFieldsHiddenForSurveyEvaluatorDto): string;
    remove(id: string): string;
}
