import { CreateSurveyMetadataDto } from './dto/create-survey_metadata.dto';
import { UpdateSurveyMetadataDto } from './dto/update-survey_metadata.dto';
export declare class SurveyMetadatasService {
    create(createSurveyMetadataDto: CreateSurveyMetadataDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSurveyMetadataDto: UpdateSurveyMetadataDto): string;
    remove(id: number): string;
}
