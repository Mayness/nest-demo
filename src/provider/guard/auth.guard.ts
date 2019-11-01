import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException,  } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '@module/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{ // 实现CanActive接口
  constructor(
    private readonly authService: AuthService
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    let path;
    let token;
    let req = context.switchToHttp().getRequest();
    if (req) {
      path = req.path;
      token = req.headers.token;
    } else {
      const ctx = GqlExecutionContext.create(context);
      req = ctx.getContext().req;
      path = req.baseUrl;
      token = req.get('token');
    }
    if (path === '/api/login') return true;
    try {
      req.user = this.authService.valid(token);
    } catch(e) {
      throw new UnauthorizedException(e.name);
    }
    //TEST:
    // req.user = 'test';
    return true;
  }
}