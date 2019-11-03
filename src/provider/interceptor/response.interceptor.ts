import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  errcode: number;
  errmsg?: string;
  data?: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest();
    // next.handle 为执行原的函数，基于此做AOP操作
    // graphql请求不能修改输出结构
    return next.handle().pipe(
      map<Response<T>, any>(data => {
        return req ? {
          data,
          errno: 0,
          errmsg: '',
        } : data;
      }),
    );
  }
}
