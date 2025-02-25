import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { ValidJwtCachesModule } from './valid_jwt_caches/valid_jwt_caches.module';
import { AccountCreationRequestsModule } from './account_creation_requests/account_creation_requests.module';
import { InitRolesService } from './init_roles/init_roles.service';
import { HttpModule } from '@nestjs/axios';
import { JwtIssuerService } from './jwt_issuer/jwt_issuer.service';
import { HstoreInitializerService } from './hstore_initializer/hstore_initializer.service';
import { TokensModule } from './tokens/tokens.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from './email/email.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    InitRolesService,
    JwtIssuerService,
    HstoreInitializerService,
    EmailService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_PSQL_SERVICE_NAME,
      port: 5432,
      // username from env file
      username: process.env.DB_USERNAME,
      // password from env file
      password: process.env.DB_PASSWORD,
      // database name from env file
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    RolesModule,
    UsersModule,
    ValidJwtCachesModule,
    AccountCreationRequestsModule,
    HttpModule,
    TokensModule,
    JwtModule.register({
      privateKey: process.env.AUTH_RSA_PRIVATE_KEY_FOR_JWT, // Your private RSA key
      publicKey: process.env.RSA_PUBLIC_KEY_FOR_JWT, // Your public RSA key
      signOptions: {
        expiresIn: '1h', // Set token expiration time
        algorithm: 'RS256', // Use RS256 algorithm
      },
    }),
  ],
})
export class AppModule {}
