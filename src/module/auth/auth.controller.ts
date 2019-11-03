import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { User } from '../../provider/decorator/User.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TransformPipe } from '../../provider/pipe/transform.pipe'

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  @Get('getUser')
  getUser(@User() user: any): any {
    return user;
  }

  @Get('getChild')
  @UsePipes(TransformPipe)
  getChildArray(@Query('child') child: string): any {
    return child;
  }
}