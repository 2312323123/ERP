import { Injectable } from '@nestjs/common';
import { CreateSurveyMetadataDto } from './dto/create-survey_metadata.dto';
import { UpdateSurveyMetadataDto } from './dto/update-survey_metadata.dto';

@Injectable()
export class SurveyMetadatasService {
  create(createSurveyMetadataDto: CreateSurveyMetadataDto) {
    return 'This action adds a new surveyMetadata';
  }

  findAll() {
    return `This action returns all surveyMetadatas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} surveyMetadata`;
  }

  update(id: number, updateSurveyMetadataDto: UpdateSurveyMetadataDto) {
    return `This action updates a #${id} surveyMetadata`;
  }

  remove(id: number) {
    return `This action removes a #${id} surveyMetadata`;
  }
}
