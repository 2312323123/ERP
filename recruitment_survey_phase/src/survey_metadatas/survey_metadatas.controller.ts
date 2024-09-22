import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyMetadatasService } from './survey_metadatas.service';
import { CreateSurveyMetadataDto } from './dto/create-survey_metadata.dto';
import { UpdateSurveyMetadataDto } from './dto/update-survey_metadata.dto';

@Controller('survey-metadatas')
export class SurveyMetadatasController {
  constructor(private readonly surveyMetadatasService: SurveyMetadatasService) {}

  @Post()
  create(@Body() createSurveyMetadataDto: CreateSurveyMetadataDto) {
    return this.surveyMetadatasService.create(createSurveyMetadataDto);
  }

  @Get()
  findAll() {
    return this.surveyMetadatasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyMetadatasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurveyMetadataDto: UpdateSurveyMetadataDto) {
    return this.surveyMetadatasService.update(+id, updateSurveyMetadataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveyMetadatasService.remove(+id);
  }
}
