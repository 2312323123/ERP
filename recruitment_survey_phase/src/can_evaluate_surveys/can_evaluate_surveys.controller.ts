import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CanEvaluateSurveysService } from './can_evaluate_surveys.service';
import { CreateCanEvaluateSurveyDto } from './dto/create-can_evaluate_survey.dto';
import { UpdateCanEvaluateSurveyDto } from './dto/update-can_evaluate_survey.dto';

@Controller('can-evaluate-surveys')
export class CanEvaluateSurveysController {
  constructor(private readonly canEvaluateSurveysService: CanEvaluateSurveysService) {}

  @Post()
  create(@Body() createCanEvaluateSurveyDto: CreateCanEvaluateSurveyDto) {
    return this.canEvaluateSurveysService.create(createCanEvaluateSurveyDto);
  }

  @Get()
  findAll() {
    return this.canEvaluateSurveysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.canEvaluateSurveysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCanEvaluateSurveyDto: UpdateCanEvaluateSurveyDto) {
    return this.canEvaluateSurveysService.update(+id, updateCanEvaluateSurveyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canEvaluateSurveysService.remove(+id);
  }
}
