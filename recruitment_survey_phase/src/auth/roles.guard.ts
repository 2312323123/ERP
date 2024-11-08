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

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No JWT token found');
    }

    const token = authHeader.split(' ')[1];
    let payload: any;

    if (requiredRoles?.length === 1 && requiredRoles?.[0] === 'skip') {
      return true; // Skip authentication altogether
    }

    try {
      // Simply verify the token
      payload = this.jwtService.verify(token);

      // Attach user ID to the request object
      request.user_id = payload.id;
    } catch {
      throw new UnauthorizedException('Invalid JWT token');
    }

    if (requiredRoles.length === 0) {
      return true; // No roles required, so allow access to anyone with a valid JWT token
    }

    const userRoles = payload.roles || [];
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
