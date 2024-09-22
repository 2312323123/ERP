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
exports.ActiveRecruitmentsController = void 0;
const common_1 = require("@nestjs/common");
const active_recruitments_service_1 = require("./active_recruitments.service");
const create_active_recruitment_dto_1 = require("./dto/create-active_recruitment.dto");
const update_active_recruitment_dto_1 = require("./dto/update-active_recruitment.dto");
let ActiveRecruitmentsController = class ActiveRecruitmentsController {
    constructor(activeRecruitmentsService) {
        this.activeRecruitmentsService = activeRecruitmentsService;
    }
    create(createActiveRecruitmentDto) {
        return this.activeRecruitmentsService.create(createActiveRecruitmentDto);
    }
    findAll() {
        return this.activeRecruitmentsService.findAll();
    }
    findOne(id) {
        return this.activeRecruitmentsService.findOne(+id);
    }
    update(id, updateActiveRecruitmentDto) {
        return this.activeRecruitmentsService.update(+id, updateActiveRecruitmentDto);
    }
    remove(id) {
        return this.activeRecruitmentsService.remove(+id);
    }
};
exports.ActiveRecruitmentsController = ActiveRecruitmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_active_recruitment_dto_1.CreateActiveRecruitmentDto]),
    __metadata("design:returntype", void 0)
], ActiveRecruitmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ActiveRecruitmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActiveRecruitmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_active_recruitment_dto_1.UpdateActiveRecruitmentDto]),
    __metadata("design:returntype", void 0)
], ActiveRecruitmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActiveRecruitmentsController.prototype, "remove", null);
exports.ActiveRecruitmentsController = ActiveRecruitmentsController = __decorate([
    (0, common_1.Controller)('active-recruitments'),
    __metadata("design:paramtypes", [active_recruitments_service_1.ActiveRecruitmentsService])
], ActiveRecruitmentsController);
//# sourceMappingURL=active_recruitments.controller.js.map