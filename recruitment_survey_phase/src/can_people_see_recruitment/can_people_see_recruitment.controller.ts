import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CanPeopleSeeRecruitmentService } from './can_people_see_recruitment.service';
import { CreateCanPeopleSeeRecruitmentDto } from './dto/create-can_people_see_recruitment.dto';
import { UpdateCanPeopleSeeRecruitmentDto } from './dto/update-can_people_see_recruitment.dto';

@Controller('can-people-see-recruitment')
export class CanPeopleSeeRecruitmentController {
  constructor(private readonly canPeopleSeeRecruitmentService: CanPeopleSeeRecruitmentService) {}

  // @Post()
  // create(@Body() createCanPeopleSeeRecruitmentDto: CreateCanPeopleSeeRecruitmentDto) {
  //   return this.canPeopleSeeRecruitmentService.create(createCanPeopleSeeRecruitmentDto);
  // }

  // @Get()
  // findAll() {
  //   return this.canPeopleSeeRecruitmentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.canPeopleSeeRecruitmentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCanPeopleSeeRecruitmentDto: UpdateCanPeopleSeeRecruitmentDto) {
  //   return this.canPeopleSeeRecruitmentService.update(+id, updateCanPeopleSeeRecruitmentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.canPeopleSeeRecruitmentService.remove(+id);
  // }
}
