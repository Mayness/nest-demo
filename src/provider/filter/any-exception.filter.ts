import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.message.message;
    const errmsg = message && Array.isArray(message) ? message[ 0 ] : message;
    response.status(status).json({
      errno: exception.getStatus(),
      errmsg: errmsg || '后台错误',
    });
  }
}
