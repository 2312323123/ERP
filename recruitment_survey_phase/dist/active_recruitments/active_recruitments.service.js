"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveRecruitmentsService = void 0;
const common_1 = require("@nestjs/common");
let ActiveRecruitmentsService = class ActiveRecruitmentsService {
    create(createActiveRecruitmentDto) {
        return 'This action adds a new activeRecruitment';
    }
    findAll() {
        return `This action returns all activeRecruitments`;
    }
    findOne(id) {
        return `This action returns a #${id} activeRecruitment`;
    }
    update(id, updateActiveRecruitmentDto) {
        return `This action updates a #${id} activeRecruitment`;
    }
    remove(id) {
        return `This action removes a #${id} activeRecruitment`;
    }
};
exports.ActiveRecruitmentsService = ActiveRecruitmentsService;
exports.ActiveRecruitmentsService = ActiveRecruitmentsService = __decorate([
    (0, common_1.Injectable)()
], ActiveRecruitmentsService);
//# sourceMappingURL=active_recruitments.service.js.map