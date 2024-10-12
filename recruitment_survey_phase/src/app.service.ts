import { Injectable } from '@nestjs/common';
import { ActiveRecruitmentService } from './active_recruitment/active_recruitment.service';
import { RecruitmentsService } from './recruitments/recruitments.service';
import { CanPeopleSeeRecruitmentService } from './can_people_see_recruitment/can_people_see_recruitment.service';

@Injectable()
export class AppService {
  constructor(
    private readonly activeRecruitmentService: ActiveRecruitmentService,
    private readonly recruitmentsService: RecruitmentsService,
    private readonly canPeopleSeeRecruitmentService: CanPeopleSeeRecruitmentService,
  ) {}

  getHello(): string {
    return 'Hello World survey!';
  }

  async getActiveRecruitmentNameUuid(): Promise<{ name: string; uuid: string } | undefined> {
    return this.activeRecruitmentService.getActiveRecruitmentNameUuid();
  }

  async getAllRecruitmentsUuidNameStartDate(): Promise<{ uuid: string; name: string; startDate: Date }[]> {
    return this.recruitmentsService.getAllRecruitmentsUuidNameStartDate();
  }

  async getCanPeopleSeeRecruitment(): Promise<{ can_people_see_recruitment: boolean }> {
    return await this.canPeopleSeeRecruitmentService.getCanPeopleSeeRecruitment();
  }

  async setCanPeopleSeeRecruitment(createCanPeopleSeeRecruitmentDto: { can_people_see_recruitment: boolean }) {
    return await this.canPeopleSeeRecruitmentService.create(createCanPeopleSeeRecruitmentDto);
  }
}
