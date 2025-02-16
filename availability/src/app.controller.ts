import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';
import {
  _Availability,
  CreateAvailabilityDto,
  UserAvailabilityInfo,
} from './availabilities/dto/create-availability.dto';
import { UserId } from './auth/user-id.decorator';
import { UndefinedCheckPipe } from './pipes/undefined-check.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles('USER')
  @Post('/api/availability')
  async updateAvailability(
    @UserId() userId: string,
    @Body('availability', UndefinedCheckPipe) availability: _Availability,
  ): Promise<void> {
    const createAvailabilityDto = new CreateAvailabilityDto();
    createAvailabilityDto.id = userId;
    createAvailabilityDto.availability = availability;
    return this.appService.updateAvailability(createAvailabilityDto);
  }

  @Roles('USER')
  @Get('/api/availability')
  async getAvailability(@Query('ids') ids: string | string[]): Promise<UserAvailabilityInfo[]> {
    if (!ids) {
      return [];
    }
    if (typeof ids === 'string') {
      ids = [ids];
    }
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new BadRequestException("Invalid input: 'ids' must be a non-empty array");
    }
    return this.appService.getAvailability(ids);
  }
}
