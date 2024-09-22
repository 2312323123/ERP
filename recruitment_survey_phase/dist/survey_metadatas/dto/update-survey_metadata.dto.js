"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSurveyMetadataDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_survey_metadata_dto_1 = require("./create-survey_metadata.dto");
class UpdateSurveyMetadataDto extends (0, mapped_types_1.PartialType)(create_survey_metadata_dto_1.CreateSurveyMetadataDto) {
}
exports.UpdateSurveyMetadataDto = UpdateSurveyMetadataDto;
//# sourceMappingURL=update-survey_metadata.dto.js.map