import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActiveRecruitmentService } from './active_recruitment.service';
import { CreateActiveRecruitmentDto } from './dto/create-active_recruitment.dto';
import { UpdateActiveRecruitmentDto } from './dto/update-active_recruitment.dto';

@Controller('active-recruitment')
export class ActiveRecruitmentController {
  constructor(private readonly activeRecruitmentService: ActiveRecruitmentService) {}

  // @Post()
  // create(@Body() createActiveRecruitmentDto: CreateActiveRecruitmentDto) {
  //   return this.activeRecruitmentService.create(createActiveRecruitmentDto);
  // }

  // @Get()
  // findAll() {
  //   return this.activeRecruitmentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.activeRecruitmentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateActiveRecruitmentDto: UpdateActiveRecruitmentDto) {
  //   return this.activeRecruitmentService.update(+id, updateActiveRecruitmentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.activeRecruitmentService.remove(+id);
  // }
}
