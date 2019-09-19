import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter, GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // 修改graphql的获取上下文
    let graphql = false;
    let response = host.switchToHttp().getResponse();
    if (!Object.keys(response).length) {
      response = GqlArgumentsHost.create(host).getContext().res;
      graphql = true;
    }
    Logger.error(JSON.stringify(exception));
    const status = exception.getStatus ? exception.getStatus() : 500;
    const message = exception.message.message || exception.message.error;
    const res = response.status(status);
    if (!graphql) {
      res.json({
        errno: status,
        errmsg: message || '后台错误',
      });
    }
  }
}
