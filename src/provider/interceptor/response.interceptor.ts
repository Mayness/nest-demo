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
    // 修改graphql拦截器导致的错误
    const req = context.switchToHttp().getRequest();
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
