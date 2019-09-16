import { Query, Resolver, Args, Info } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { UserArg } from './dto/user.arg';
import { UserService } from './user.service';

@Resolver(of => UserDto)
export class UserResolvers {
  constructor(private readonly userService: UserService) {}

  @Query(returns => UserDto)
  find(@Args() userArg: UserArg) {
    console.log(111);
    console.log(userArg);
    return;
  }
}
