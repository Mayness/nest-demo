import { Controller, Post } from '@nestjs/common';
import { AuthService } from './module/auth/auth.service';

@Controller('api')
export class AppController {
  constructor(private readonly authService:AuthService) {
  }
  @Post('login')
  login() {
    return this.authService.sign({ id: 123 })
  }
}
