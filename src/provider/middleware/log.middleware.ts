import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    Logger.log(`${req.method}  ${req.originalUrl}   ${req.method === 'GET' ? '' : JSON.stringify(req.body)}`);
    next();
  }
}
