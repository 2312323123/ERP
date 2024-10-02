import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcceptsSurveysService } from './accepts_surveys.service';
import { CreateAcceptsSurveyDto } from './dto/create-accepts_survey.dto';
import { UpdateAcceptsSurveyDto } from './dto/update-accepts_survey.dto';

@Controller('accepts-surveys')
export class AcceptsSurveysController {
  constructor(private readonly acceptsSurveysService: AcceptsSurveysService) {}

  @Post()
  create(@Body() createAcceptsSurveyDto: CreateAcceptsSurveyDto) {
    return this.acceptsSurveysService.create(createAcceptsSurveyDto);
  }

  @Get()
  findAll() {
    return this.acceptsSurveysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acceptsSurveysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcceptsSurveyDto: UpdateAcceptsSurveyDto) {
    return this.acceptsSurveysService.update(+id, updateAcceptsSurveyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acceptsSurveysService.remove(+id);
  }
}
