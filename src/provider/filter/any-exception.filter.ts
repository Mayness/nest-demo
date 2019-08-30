import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(JSON.stringify(exception));
    const status = exception.getStatus ? exception.getStatus() : 500;
    const message = exception.message.error;
    // console.log(JSON.stringify(exception));
    response.status(status).json({
      errno: status,
      errmsg: message || '后台错误',
    });
  }
}
