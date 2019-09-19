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
  async findById(@Query('id') id): Promise<User> {
    const data = await this.userService.getUser({ id });
    return data[ 0 ];
  }

  @Post('create') 
  create(@Body() params): Promise<User> {
    if (!params.name) throw new NotFoundException('Missing ‘name’ field');
    return this.userService.createUser(params.name);
  }

  @Put('update')
  update(@Body() { id, name }): Promise<User|{}> {
    return this.userService.updateUser({ id, name });
  }

  @Delete('delete')
  async delete(@Body('id') id: string) {
    await this.userService.deleteUser(id);
    return '删除成功'
  }
}