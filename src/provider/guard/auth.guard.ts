import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../module/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{ // 实现CanActive接口
  constructor(
    private readonly authService: AuthService
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const req = context.switchToHttp().getRequest();
    console.log(context.switchToHttp());
    if (req.path === '/api/login') return true;
    const token = req.headers.token;
    try {
      req.user = this.authService.valid(token);
    } catch(e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}