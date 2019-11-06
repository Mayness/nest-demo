import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  errno: number;
  errmsg?: string;
  data?: T;
}

const generaResponse = function (msg: any): Response<any> {
  const data = msg || '操作成功';
  return {
    data,
    errno: 0,
    errmsg: '',
  }
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<any>> {
    const req = context.switchToHttp().getRequest();
    // next.handle 为执行原的函数，基于此做AOP操作
    // graphql请求不能修改输出结构
    return next.handle().pipe(
      map<Response<any>, any>(data => req ? generaResponse(data) : data),
    );
  }
}