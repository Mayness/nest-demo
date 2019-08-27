import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../../db/database.module';
import { UserProviders } from '../../db/user/user.prividers';

@Module({
  imports: [ DatabaseModule ],
  controllers: [ UserController ],
  providers: [
    ...UserProviders,
    UserService
  ],
})
export class UserModule {}
