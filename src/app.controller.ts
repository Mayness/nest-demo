import { Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from '@module/auth/auth.service';

@Controller('api')
export class AppController {
  constructor(private readonly authService:AuthService) {
  }
  
  @Post('login')
  @SetMetadata('roles', 'all')
  login() {
    return this.authService.sign({ id: 123 })
  }
}
