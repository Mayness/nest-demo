import { Query, Resolver, Args, Info, Mutation } from '@nestjs/graphql';
import { ID } from 'type-graphql';
import { UserDto, OperaUserDto } from './dto/user.dto';
import { UserArg, CreateUserArg, UpdateUserArg } from './dto/user.arg';
import { UserService } from './user.service';

@Resolver(() => UserDto)
export class UserResolvers {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [UserDto])
  find(@Args() where: UserArg): Promise<UserDto[]> {
    return this.userService.getUser(where);
  }

  @Query(returns => UserDto, { nullable: true })
  async findById(@Args('id') id: string): Promise<UserDto> {
    const data = await this.userService.getUser({ id });
    return data[ 0 ];
  }

  @Mutation(returns => UserDto)
  createUser(@Args() params: CreateUserArg): Promise<UserDto> {
    return this.userService.createUser(params);
  }

  @Mutation(returns => OperaUserDto)
  updateUser(@Args() params: UpdateUserArg): Promise<OperaUserDto> {
    return this.userService.updateUser(params);
  }

  @Mutation(returns => OperaUserDto)
  async deleteUser(@Args({ name: 'id', type: () => ID }) id: string): Promise<OperaUserDto> {
    return this.userService.deleteUser(id);
  }
}