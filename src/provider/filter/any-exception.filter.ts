import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter, GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    // 修改graphql的获取上下文
    let graphql = false;
    let response = host.switchToHttp().getResponse();
    if (!Object.keys(response).length) {
      response = GqlArgumentsHost.create(host).getContext().res;
      graphql = true;
    }
    Logger.error(exception);
    const status = exception.getStatus ? exception.getStatus() : 500;
    let message = exception.message.message || exception.message.error;
    if (Array.isArray(message)) {
      message = `${Object.values(message[ 0 ].constraints)[ 0 ]}: ${message[ 0 ].property}`
    }
    const res = response.status(status);
    if (!graphql) {
      res.json({
        errno: status,
        errmsg: message || '后台错误',
      });
    }
  }
}
