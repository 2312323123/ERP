"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecruitmentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_recruitment_dto_1 = require("./create-recruitment.dto");
class UpdateRecruitmentDto extends (0, mapped_types_1.PartialType)(create_recruitment_dto_1.CreateRecruitmentDto) {
}
exports.UpdateRecruitmentDto = UpdateRecruitmentDto;
//# sourceMappingURL=update-recruitment.dto.js.map