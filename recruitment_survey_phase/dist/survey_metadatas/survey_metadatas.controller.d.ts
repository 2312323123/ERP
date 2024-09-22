import { SurveyMetadatasService } from './survey_metadatas.service';
import { CreateSurveyMetadataDto } from './dto/create-survey_metadata.dto';
import { UpdateSurveyMetadataDto } from './dto/update-survey_metadata.dto';
export declare class SurveyMetadatasController {
    private readonly surveyMetadatasService;
    constructor(surveyMetadatasService: SurveyMetadatasService);
    create(createSurveyMetadataDto: CreateSurveyMetadataDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSurveyMetadataDto: UpdateSurveyMetadataDto): string;
    remove(id: string): string;
}
