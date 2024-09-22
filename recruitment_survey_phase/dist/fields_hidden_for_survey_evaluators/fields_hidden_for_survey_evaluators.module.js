"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsHiddenForSurveyEvaluatorsModule = void 0;
const common_1 = require("@nestjs/common");
const fields_hidden_for_survey_evaluators_service_1 = require("./fields_hidden_for_survey_evaluators.service");
const fields_hidden_for_survey_evaluators_controller_1 = require("./fields_hidden_for_survey_evaluators.controller");
let FieldsHiddenForSurveyEvaluatorsModule = class FieldsHiddenForSurveyEvaluatorsModule {
};
exports.FieldsHiddenForSurveyEvaluatorsModule = FieldsHiddenForSurveyEvaluatorsModule;
exports.FieldsHiddenForSurveyEvaluatorsModule = FieldsHiddenForSurveyEvaluatorsModule = __decorate([
    (0, common_1.Module)({
        controllers: [fields_hidden_for_survey_evaluators_controller_1.FieldsHiddenForSurveyEvaluatorsController],
        providers: [fields_hidden_for_survey_evaluators_service_1.FieldsHiddenForSurveyEvaluatorsService],
    })
], FieldsHiddenForSurveyEvaluatorsModule);
//# sourceMappingURL=fields_hidden_for_survey_evaluators.module.js.map