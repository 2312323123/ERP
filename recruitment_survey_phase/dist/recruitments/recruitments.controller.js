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
exports.RecruitmentsController = void 0;
const common_1 = require("@nestjs/common");
const recruitments_service_1 = require("./recruitments.service");
const create_recruitment_dto_1 = require("./dto/create-recruitment.dto");
const update_recruitment_dto_1 = require("./dto/update-recruitment.dto");
let RecruitmentsController = class RecruitmentsController {
    constructor(recruitmentsService) {
        this.recruitmentsService = recruitmentsService;
    }
    create(createRecruitmentDto) {
        return this.recruitmentsService.create(createRecruitmentDto);
    }
    findAll() {
        return this.recruitmentsService.findAll();
    }
    findOne(id) {
        return this.recruitmentsService.findOne(+id);
    }
    update(id, updateRecruitmentDto) {
        return this.recruitmentsService.update(+id, updateRecruitmentDto);
    }
    remove(id) {
        return this.recruitmentsService.remove(+id);
    }
};
exports.RecruitmentsController = RecruitmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recruitment_dto_1.CreateRecruitmentDto]),
    __metadata("design:returntype", void 0)
], RecruitmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecruitmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_recruitment_dto_1.UpdateRecruitmentDto]),
    __metadata("design:returntype", void 0)
], RecruitmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentsController.prototype, "remove", null);
exports.RecruitmentsController = RecruitmentsController = __decorate([
    (0, common_1.Controller)('recruitments'),
    __metadata("design:paramtypes", [recruitments_service_1.RecruitmentsService])
], RecruitmentsController);
//# sourceMappingURL=recruitments.controller.js.map