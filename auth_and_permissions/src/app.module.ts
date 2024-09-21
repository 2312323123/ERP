import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { UserRolesModule } from './user_roles/user_roles.module';
import { RoleAssignmentRightsModule } from './role_assignment_rights/role_assignment_rights.module';
import { ValidJwtCachesModule } from './valid_jwt_caches/valid_jwt_caches.module';
import { AccountCreationRequestsModule } from './account_creation_requests/account_creation_requests.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      // username from env file
      username: process.env.DB_USERNAME,
      // password from env file
      password: process.env.DB_PASSWORD,
      // database name from env file
      database: process.env.DB_NAME,
      // entities: [],
      autoLoadEntities: true,
      // synchronize: true,
    }),
    RolesModule,
    UsersModule,
    UserRolesModule,
    RoleAssignmentRightsModule,
    ValidJwtCachesModule,
    AccountCreationRequestsModule,
  ],
})
export class AppModule {}
