import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException,  } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AuthService } from '@module/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{ // 实现CanActive接口
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    // TEST:
    return true
    const role = this.reflector.get<string>('roles', context.getHandler());
    if (role === 'all') return true;
    // let path;
    let token;
    let req = context.switchToHttp().getRequest();
    if (req) {
      // path = req.path;
      token = req.headers.token;
    } else {
      const ctx = GqlExecutionContext.create(context);
      req = ctx.getContext().req;
      // path = req.baseUrl;
      token = req.get('token');
    }
    try {
      req.user = this.authService.valid(token);
    } catch(e) {
      throw new UnauthorizedException(e.name);
    }
    return true;
  }
}