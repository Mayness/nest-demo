import { Controller, Get, Post, Param, Put, Delete, Query, Body, NotFoundException } from '@nestjs/common';
import { UserArg, CreateUserArg, UpdateUserArg } from './dto/user.arg';
import { MixinCatsOfUser } from './dto/user.dto';
import { UserService } from './user.service';

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
  async create(@Body() Params: CreateUserArg): Promise<void> {
    await this.userService.createUser(Params);
  }

  @Put('update')
  async update(@Body() { id, name }: UpdateUserArg): Promise<void> {
    await this.userService.updateUser({ id, name });
  }

  @Delete('delete')
  async delete(@Body('id') id: string): Promise<string|void> {
    const data = await this.userService.deleteUser(id);
    console.log(data);
    if (!Object.keys(data).length) {
      return '删除失败';
    }
  }
}
