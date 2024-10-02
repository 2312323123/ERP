import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarkGradeNamesService } from './mark_grade_names.service';
import { CreateMarkGradeNameDto } from './dto/create-mark_grade_name.dto';
import { UpdateMarkGradeNameDto } from './dto/update-mark_grade_name.dto';

@Controller('mark-grade-names')
export class MarkGradeNamesController {
  constructor(private readonly markGradeNamesService: MarkGradeNamesService) {}

  @Post()
  create(@Body() createMarkGradeNameDto: CreateMarkGradeNameDto) {
    return this.markGradeNamesService.create(createMarkGradeNameDto);
  }

  @Get()
  findAll() {
    return this.markGradeNamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markGradeNamesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkGradeNameDto: UpdateMarkGradeNameDto) {
    return this.markGradeNamesService.update(+id, updateMarkGradeNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markGradeNamesService.remove(+id);
  }
}
