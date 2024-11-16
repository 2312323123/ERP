import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewsModule } from './interviews/interviews.module';
import { InterviewsSettingsModule } from './interviews_settings/interviews_settings.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { Interview } from './interviews/entities/interview.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_PSQL_SERVICE_NAME,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    InterviewsModule,
    InterviewsSettingsModule,
    JwtModule.register({
      publicKey: process.env.RSA_PUBLIC_KEY_FOR_JWT, // your public RSA key
      signOptions: {
        algorithm: 'RS256', // use RS256 algorithm
      },
    }),
    TypeOrmModule.forFeature([Interview]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
