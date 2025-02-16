import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InitRolesService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  postDatas = [
    {
      role: 'KOO_IT',
      description: 'Sees things in backups tab from main menu',
    },
  ];

  onModuleInit() {
    // timeout to let the paths boot up before making requests
    setTimeout(() => {
      void Promise.all(
        this.postDatas.map(async (postData) => {
          try {
            await lastValueFrom(
              this.httpService.post('http://auth_and_permissions:3000/api/auth/setup-roles', postData),
            );
          } catch {
            console.log(`error 3r4r3df - role ${postData.role} already exists`);
          }
        }),
      );
    }, 0);
  }
}
