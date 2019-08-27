import { Injectable, Inject } from '@nestjs/common';
@Injectable()
export class CatsService {
  constructor(@Inject('Cats') private readonly cats) {
  }
   
  getHello(): string {
    return JSON.stringify(this.cats);
  }
}