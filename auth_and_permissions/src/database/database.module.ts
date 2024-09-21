import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      // username from env file
      username: process.env.DB_USERNAME,
      // password from env file
      password: process.env.DB_PASSWORD,
      // database name from env file
      database: process.env.DB_NAME,
      models: [],
    }),
  ],
})
export class DatabaseModule {}
