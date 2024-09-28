import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InitRolesService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  postDatas = [
    {
      role: 'SUPERADMIN',
      description: 'System administrator, has all the privileges, role created by auth service',
    },
    {
      role: 'USER',
      description: 'Can enter the system, role created by auth service',
    },
  ];

  async onModuleInit() {
    // timeout to let the paths boot up before making requests
    setTimeout(async () => {
      this.postDatas.forEach(async (postData) => {
        try {
          await lastValueFrom(this.httpService.post('http://auth_and_permissions:3000/api/auth/setup-roles', postData));
        } catch {
          console.log(`error 493r84t - role ${postData.role} already exists`);
        }
      });
    }, 0);
  }
}
