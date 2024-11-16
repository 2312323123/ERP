import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewsModule } from './interviews/interviews.module';
import { InterviewsSettingsModule } from './interviews_settings/interviews_settings.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
