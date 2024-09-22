import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActiveRecruitmentsService } from './active_recruitments.service';
import { CreateActiveRecruitmentDto } from './dto/create-active_recruitment.dto';
import { UpdateActiveRecruitmentDto } from './dto/update-active_recruitment.dto';

@Controller('active-recruitments')
export class ActiveRecruitmentsController {
  constructor(private readonly activeRecruitmentsService: ActiveRecruitmentsService) {}

  @Post()
  create(@Body() createActiveRecruitmentDto: CreateActiveRecruitmentDto) {
    return this.activeRecruitmentsService.create(createActiveRecruitmentDto);
  }

  @Get()
  findAll() {
    return this.activeRecruitmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activeRecruitmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActiveRecruitmentDto: UpdateActiveRecruitmentDto) {
    return this.activeRecruitmentsService.update(+id, updateActiveRecruitmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activeRecruitmentsService.remove(+id);
  }
}
