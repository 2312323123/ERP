"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptSurveysService = void 0;
const common_1 = require("@nestjs/common");
let AcceptSurveysService = class AcceptSurveysService {
    create(createAcceptSurveyDto) {
        return 'This action adds a new acceptSurvey';
    }
    findAll() {
        return `This action returns all acceptSurveys`;
    }
    findOne(id) {
        return `This action returns a #${id} acceptSurvey`;
    }
    update(id, updateAcceptSurveyDto) {
        return `This action updates a #${id} acceptSurvey`;
    }
    remove(id) {
        return `This action removes a #${id} acceptSurvey`;
    }
};
exports.AcceptSurveysService = AcceptSurveysService;
exports.AcceptSurveysService = AcceptSurveysService = __decorate([
    (0, common_1.Injectable)()
], AcceptSurveysService);
//# sourceMappingURL=accept_surveys.service.js.map