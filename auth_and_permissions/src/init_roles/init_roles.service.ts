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
    this.postDatas.forEach(async (postData) => {
      try {
        await lastValueFrom(this.httpService.post('http://auth_and_permissions:3000/api/auth/setup-roles', postData));
      } catch {
        console.log(`error 493r84t - role ${postData.role} already exists`);
      }
    });
  }

  // // onModuleInit(), but GET /api/auth
  // async onModuleInit() {
  //   this.postDatas.forEach(async (postData) => {
  //     await lastValueFrom(this.httpService.get('http://auth_and_permissions:3000/api/auth'));
  //   });
  // }
}
