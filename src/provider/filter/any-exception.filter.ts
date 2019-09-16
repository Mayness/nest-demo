import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    Logger.error(JSON.stringify(exception));
    const status = exception.getStatus ? exception.getStatus() : 500;
    const message = exception.message.error;
    response.status(status).json({
      errno: status,
      errmsg: message || '后台错误',
    });
  }
}
