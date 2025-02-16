import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InitRolesService } from './init_roles/init_roles.service';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    JwtModule.register({
      publicKey: process.env.RSA_PUBLIC_KEY_FOR_JWT, // your public RSA key
      signOptions: {
        algorithm: 'RS256', // use RS256 algorithm
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    InitRolesService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
