import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as serveStatic from 'serve-static';
import * as helmet from 'helmet';
import * as path from 'path';

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

  app.use('/public', serveStatic(path.join(__dirname, '../public'), {
    maxAge: '1d'
  }));
  await app.listen(3000);

}
bootstrap();

