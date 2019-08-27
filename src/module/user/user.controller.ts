import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { User } from '../../db/user/user.entity';
import { UserService } from './user.service';

@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('find')
  find(): Promise<User[]> {
    return this.userService.getUser();
  }

  @Post('create') 
  create(): Promise<string> {
    return this.userService.createUser();
  }

  @Put('update')
  async update(): Promise<string> {
    await this.userService.updateUser();
    return '修改成功'
  }

  @Delete('delete')
  async delete(): Promise<string> {
    await this.userService.deleteUser();
    return '删除成功'
  }
}