"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyMetadatasController = void 0;
const common_1 = require("@nestjs/common");
const survey_metadatas_service_1 = require("./survey_metadatas.service");
const create_survey_metadata_dto_1 = require("./dto/create-survey_metadata.dto");
const update_survey_metadata_dto_1 = require("./dto/update-survey_metadata.dto");
let SurveyMetadatasController = class SurveyMetadatasController {
    constructor(surveyMetadatasService) {
        this.surveyMetadatasService = surveyMetadatasService;
    }
    create(createSurveyMetadataDto) {
        return this.surveyMetadatasService.create(createSurveyMetadataDto);
    }
    findAll() {
        return this.surveyMetadatasService.findAll();
    }
    findOne(id) {
        return this.surveyMetadatasService.findOne(+id);
    }
    update(id, updateSurveyMetadataDto) {
        return this.surveyMetadatasService.update(+id, updateSurveyMetadataDto);
    }
    remove(id) {
        return this.surveyMetadatasService.remove(+id);
    }
};
exports.SurveyMetadatasController = SurveyMetadatasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_survey_metadata_dto_1.CreateSurveyMetadataDto]),
    __metadata("design:returntype", void 0)
], SurveyMetadatasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SurveyMetadatasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SurveyMetadatasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_survey_metadata_dto_1.UpdateSurveyMetadataDto]),
    __metadata("design:returntype", void 0)
], SurveyMetadatasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SurveyMetadatasController.prototype, "remove", null);
exports.SurveyMetadatasController = SurveyMetadatasController = __decorate([
    (0, common_1.Controller)('survey-metadatas'),
    __metadata("design:paramtypes", [survey_metadatas_service_1.SurveyMetadatasService])
], SurveyMetadatasController);
//# sourceMappingURL=survey_metadatas.controller.js.map