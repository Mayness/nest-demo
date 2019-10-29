import { Controller, Get, Post, Param, Put, Delete, Query, Body, NotFoundException } from '@nestjs/common';
import { UserArg, CreateUserArg, UpdateUserArg, DeleteUserArg } from './dto/user.arg';
import { User } from './user.entity';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }


  @Get('find')
  find(@Query() Query: UserArg): Promise<User[]> {
    return this.userService.getUser(Query);
  }

  @Get('findById/:id')
  async findById(@Param('id') id: string): Promise<User> {
    const data = await this.userService.getUser({ id });
    return data[ 0 ];
  }

  @Post('create') 
  create(@Body() Params: CreateUserArg): Promise<User> {
    return this.userService.createUser(Params);
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