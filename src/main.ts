import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('api example')
    .setVersion('1.0')
    .addBearerAuth('token')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // 设置全局校验参数过滤
  app.useGlobalPipes(new ValidationPipe({ validationError: { target: false } }));
  // 安全策略、禁用客户端缓存、xss字段过滤
  app.use(helmet());
  await app.listen(3000);

}
bootstrap();

