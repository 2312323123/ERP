"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsHiddenForSurveyEvaluatorsService = void 0;
const common_1 = require("@nestjs/common");
let FieldsHiddenForSurveyEvaluatorsService = class FieldsHiddenForSurveyEvaluatorsService {
    create(createFieldsHiddenForSurveyEvaluatorDto) {
        return 'This action adds a new fieldsHiddenForSurveyEvaluator';
    }
    findAll() {
        return `This action returns all fieldsHiddenForSurveyEvaluators`;
    }
    findOne(id) {
        return `This action returns a #${id} fieldsHiddenForSurveyEvaluator`;
    }
    update(id, updateFieldsHiddenForSurveyEvaluatorDto) {
        return `This action updates a #${id} fieldsHiddenForSurveyEvaluator`;
    }
    remove(id) {
        return `This action removes a #${id} fieldsHiddenForSurveyEvaluator`;
    }
};
exports.FieldsHiddenForSurveyEvaluatorsService = FieldsHiddenForSurveyEvaluatorsService;
exports.FieldsHiddenForSurveyEvaluatorsService = FieldsHiddenForSurveyEvaluatorsService = __decorate([
    (0, common_1.Injectable)()
], FieldsHiddenForSurveyEvaluatorsService);
//# sourceMappingURL=fields_hidden_for_survey_evaluators.service.js.map