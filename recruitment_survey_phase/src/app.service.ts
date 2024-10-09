import { Injectable } from '@nestjs/common';
import { ActiveRecruitmentService } from './active_recruitment/active_recruitment.service';

@Injectable()
export class AppService {
  constructor(private readonly activeRecruitmentService: ActiveRecruitmentService) {}

  getHello(): string {
    return 'Hello World survey!';
  }

  async getActiveRecruitmentNameUuid(): Promise<{ name: string; uuid: string } | undefined> {
    return this.activeRecruitmentService.getActiveRecruitmentNameUuid();
  }
}
