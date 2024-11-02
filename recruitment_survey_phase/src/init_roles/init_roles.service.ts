import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InitRolesService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  postDatas = [
    {
      role: 'RECRUITMENT_ADMIN',
      description:
        'Recruitment responsible person, can set recruitment settings, role created by recruitment_survey_phase service',
    },
  ];

  async onModuleInit() {
    // timeout to let the paths boot up before making requests
    setTimeout(async () => {
      this.postDatas.forEach(async (postData) => {
        try {
          await lastValueFrom(this.httpService.post('http://auth_and_permissions:3000/api/auth/setup-roles', postData));
        } catch {
          console.log(`error 85u38tt - role ${postData.role} already exists`);
        }
      });
    }, 0);
  }
}
