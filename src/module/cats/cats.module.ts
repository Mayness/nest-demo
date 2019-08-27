import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [ CatsController ],
  providers: [
    CatsService,
    {
      provide: 'Cats',
      useValue: {
        test: 1,
      },
    }
  ],
  exports: [ CatsService ],
})
export class CatsModule {}
