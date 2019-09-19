import { Controller, Get } from '@nestjs/common';
import { User } from '../../provider/decorator/User.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  @Get('getUser')
  getUser(@User() user) {
    return user;
  }
}