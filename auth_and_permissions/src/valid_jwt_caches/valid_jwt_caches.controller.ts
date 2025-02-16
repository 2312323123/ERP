import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValidJwtCachesService } from './valid_jwt_caches.service';
import { CreateValidJwtCachDto } from './dto/create-valid_jwt_cach.dto';
import { UpdateValidJwtCachDto } from './dto/update-valid_jwt_cach.dto';

@Controller('valid-jwt-caches')
export class ValidJwtCachesController {
  constructor(private readonly validJwtCachesService: ValidJwtCachesService) {}

  // @Post()
  // create(@Body() createValidJwtCachDto: CreateValidJwtCachDto) {
  //   return this.validJwtCachesService.create(createValidJwtCachDto);
  // }

  // @Get()
  // findAll() {
  //   return this.validJwtCachesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.validJwtCachesService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateValidJwtCachDto: UpdateValidJwtCachDto) {
  //   return this.validJwtCachesService.update(id, updateValidJwtCachDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.validJwtCachesService.remove(id);
  // }
}
