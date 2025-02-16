import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (requiredRoles?.length === 1 && requiredRoles?.[0] === 'skip') {
      return true; // Skip authentication altogether
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No JWT token found');
    }

    const token = authHeader.split(' ')[1];
    let payload: any;
    try {
      // Verify token with RS256 algorithm using public key from env
      payload = this.jwtService.verify(token, {
        algorithms: ['RS256'],
        publicKey: process.env.RSA_PUBLIC_KEY_FOR_JWT,
      });

      // Attach user ID to the request object
      request.user_id = payload.id;
    } catch (e) {
      throw e;
      // throw new UnauthorizedException('Invalid JWT token');
    }

    if (requiredRoles.length === 0) {
      return true; // No roles required, so allow access to anyone with a valid JWT token
    }

    const userRoles = payload.roles || [];
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
