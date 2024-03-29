import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { env } from 'src/shared/config/env';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/shared/decorators/SetPublic';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    // console.log({
    //   class: context.getClass(),
    //   method: context.getHandler()
    // });

    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.jwtSecret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['userId'] = payload.sub;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
