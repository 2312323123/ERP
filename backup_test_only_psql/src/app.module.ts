import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestEntity } from './postgres/test.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db-psql',
      port: 5432,
      username: process.env.BACKUP_TEST_ONLY_PSQL_USER,
      password: process.env.BACKUP_TEST_ONLY_PSQL_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [TestEntity],
      synchronize: true, // Only for development!
    }),
    TypeOrmModule.forFeature([TestEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
