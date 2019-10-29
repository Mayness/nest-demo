import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cats } from './cats.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Cats ]),
  ],
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
