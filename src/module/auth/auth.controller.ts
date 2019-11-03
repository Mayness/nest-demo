import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { User } from '../../provider/decorator/User.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TransformPipe } from '../../provider/pipe/transform.pipe'
import { ChildDto } from './dto/auth.dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  @Get('getUser')
  getUser(@User() user) {
    return user;
  }

  @Get('getChild')
  @UsePipes(new TransformPipe())
  getChildArray(@Query('child') child: ChildDto) {
    return child;
  }
}