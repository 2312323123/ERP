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
exports.AcceptSurveysController = void 0;
const common_1 = require("@nestjs/common");
const accept_surveys_service_1 = require("./accept_surveys.service");
const create_accept_survey_dto_1 = require("./dto/create-accept_survey.dto");
const update_accept_survey_dto_1 = require("./dto/update-accept_survey.dto");
let AcceptSurveysController = class AcceptSurveysController {
    constructor(acceptSurveysService) {
        this.acceptSurveysService = acceptSurveysService;
    }
    create(createAcceptSurveyDto) {
        return this.acceptSurveysService.create(createAcceptSurveyDto);
    }
    findAll() {
        return this.acceptSurveysService.findAll();
    }
    findOne(id) {
        return this.acceptSurveysService.findOne(+id);
    }
    update(id, updateAcceptSurveyDto) {
        return this.acceptSurveysService.update(+id, updateAcceptSurveyDto);
    }
    remove(id) {
        return this.acceptSurveysService.remove(+id);
    }
};
exports.AcceptSurveysController = AcceptSurveysController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_accept_survey_dto_1.CreateAcceptSurveyDto]),
    __metadata("design:returntype", void 0)
], AcceptSurveysController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AcceptSurveysController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcceptSurveysController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_accept_survey_dto_1.UpdateAcceptSurveyDto]),
    __metadata("design:returntype", void 0)
], AcceptSurveysController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcceptSurveysController.prototype, "remove", null);
exports.AcceptSurveysController = AcceptSurveysController = __decorate([
    (0, common_1.Controller)('accept-surveys'),
    __metadata("design:paramtypes", [accept_surveys_service_1.AcceptSurveysService])
], AcceptSurveysController);
//# sourceMappingURL=accept_surveys.controller.js.map