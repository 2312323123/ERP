import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCanPeopleSeeRecruitmentDto } from './can_people_see_recruitment/dto/create-can_people_see_recruitment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello1(): string {
    return this.appService.getHello();
  }

  @Get('/api/surveys')
  getHello(): string {
    return 'Hello World auth!';
  }

  @Get('/api/surveys/active-recruitment-name-uuid')
  async getActiveRecruitmentNameUuid(): Promise<{ name: string; uuid: string } | undefined> {
    return this.appService.getActiveRecruitmentNameUuid();
  }

  @Get('/api/surveys/all-recruitments-uuid-name-start-date')
  async getAllRecruitmentsUuidNameStartDate(): Promise<{ uuid: string; name: string; startDate: Date }[]> {
    return this.appService.getAllRecruitmentsUuidNameStartDate();
  }

  @Get('/api/surveys/can-people-see-recruitment')
  async getCanPeopleSeeRecruitment(): Promise<{ can_people_see_recruitment: boolean }> {
    return this.appService.getCanPeopleSeeRecruitment();
  }

  @Post('/api/surveys/can-people-see-recruitment')
  async setCanPeopleSeeRecruitment(@Body() createCanPeopleSeeRecruitmentDto: CreateCanPeopleSeeRecruitmentDto) {
    return this.appService.setCanPeopleSeeRecruitment(createCanPeopleSeeRecruitmentDto);
  }
}
