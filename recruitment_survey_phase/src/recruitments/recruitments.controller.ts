import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecruitmentsService } from './recruitments.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';

@Controller('recruitments')
export class RecruitmentsController {
  constructor(private readonly recruitmentsService: RecruitmentsService) {}

  // @Post()
  // create(@Body() createRecruitmentDto: CreateRecruitmentDto) {
  //   return this.recruitmentsService.create(createRecruitmentDto);
  // }

  // @Get()
  // findAll() {
  //   return this.recruitmentsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.recruitmentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRecruitmentDto: UpdateRecruitmentDto) {
  //   return this.recruitmentsService.update(+id, updateRecruitmentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recruitmentsService.remove(+id);
  // }
}
