import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret key',
      signOptions: {
        expiresIn: '30m',
      }
    }),
  ],
  controllers: [ AuthController ],
  providers: [
    AuthService,
  ],
  exports: [ AuthService ],
})
export class AuthModule {}
