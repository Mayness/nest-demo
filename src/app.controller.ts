import { Controller } from '@nestjs/common';
import { CatsService } from './module/cats/cats.service';

@Controller('app')
export class AppController {
  constructor(private readonly catsService:CatsService) {
    console.log(catsService.getHello());
  }
}
