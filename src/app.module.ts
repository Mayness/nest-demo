import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { CatsModule } from './module/cats/cats.module';
import { UserModule } from './module/user/user.module';
import { LoggerMiddleware } from './provider/middleware/log.middleware';
import { ResponseInterceptor } from './provider/interceptor/response.interceptor';
import { AnyExceptionFilter } from './provider/filter/any-exception.filter';

@Module({
  imports: [CatsModule, UserModule],
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
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
