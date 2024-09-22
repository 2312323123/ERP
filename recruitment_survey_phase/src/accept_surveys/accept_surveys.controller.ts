import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcceptSurveysService } from './accept_surveys.service';
import { CreateAcceptSurveyDto } from './dto/create-accept_survey.dto';
import { UpdateAcceptSurveyDto } from './dto/update-accept_survey.dto';

@Controller('accept-surveys')
export class AcceptSurveysController {
  constructor(private readonly acceptSurveysService: AcceptSurveysService) {}

  @Post()
  create(@Body() createAcceptSurveyDto: CreateAcceptSurveyDto) {
    return this.acceptSurveysService.create(createAcceptSurveyDto);
  }

  @Get()
  findAll() {
    return this.acceptSurveysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acceptSurveysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcceptSurveyDto: UpdateAcceptSurveyDto) {
    return this.acceptSurveysService.update(+id, updateAcceptSurveyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acceptSurveysService.remove(+id);
  }
}
