import { Controller, Get, Post, Put, Delete, Query, Body, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }


  @Get('find')
  find(@Query() where): Promise<User[]> {
    return this.userService.getUser(where);
  }

  @Get('findById')
  findById(@Query('id') id): Promise<User[]> {
    return this.userService.getUser({ id });
  }

  @Post('create') 
  create(@Body() params): Promise<string> {
    if (!params.name) throw new NotFoundException();
    return this.userService.createUser(params.name);
  }

  @Put('update')
  async update(@Body() { id, name }): Promise<string> {
    await this.userService.updateUser({ id, name });
    return '修改成功'
  }

  @Delete('delete')
  async delete(@Body('id') id: number) {
    await this.userService.deleteUser(id);
    return '删除成功'
  }
}