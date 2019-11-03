import { Controller, Get, Post, Param, Put, Delete, Query, Body, NotFoundException } from '@nestjs/common';
import { UserArg, CreateUserArg, UpdateUserArg } from './dto/user.arg';
import { MixinCatsOfUser } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

export type responseUser = Promise<User[]>;
export type responseMixinCatsOfUser = Promise<MixinCatsOfUser[]>;

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }


  @Get('find')
  find(@Query() query: UserArg): responseMixinCatsOfUser {
    return this.userService.getUser(query);
  }

  @Get('findById/:id')
  async findById(@Param('id') id: string): Promise<MixinCatsOfUser> {
    const data = await this.userService.getUser({ id });
    return data[ 0 ];
  }

  @Post('create') 
  create(@Body() Params: CreateUserArg): Promise<User> {
    return this.userService.createUser(Params);
  }

  @Put('update')
  update(@Body() { id, name }: UpdateUserArg): Promise<User|{}> {
    return this.userService.updateUser({ id, name });
  }

  @Delete('delete')
  async delete(@Body('id') id: string) {
    await this.userService.deleteUser(id);
    return '删除成功'
  }
}
