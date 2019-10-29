import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolvers } from './user.resolvers';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from '../cats/cats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    CatsModule,
  ],
  controllers: [ UserController ],
  providers: [
    UserService,
    UserResolvers,
  ],
  exports: [ UserService ],
})
export class UserModule {}
