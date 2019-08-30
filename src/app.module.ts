import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';

import { CatsModule } from './module/cats/cats.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from './config/config.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';

import { LoggerMiddleware } from './provider/middleware/log.middleware';
import { ResponseInterceptor } from './provider/interceptor/response.interceptor';
import { AnyExceptionFilter } from './provider/filter/any-exception.filter';
import { AuthGuard } from './provider/guard/auth.guard';

import { join } from 'path';

@Module({
  imports: [
    CatsModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: Number(config.get('MYSQL_PORT')),
        username: config.get('MYSQL_USERNAME'),
        password: config.get('MYSQL_PASSWORD'),
        database: 'test',
        entities: [join(__dirname, '**/**.entity{.ts,.js}')],
        synchronize: true,
      }),
      inject: [ ConfigService ],
    })
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
