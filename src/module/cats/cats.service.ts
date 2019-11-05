import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from './cats.entity';
import { CatsDto } from './dto/cats.dto';
import { injectCats } from './cats.module';
import { Repository } from 'typeorm';

type catsType = {
  name: string[],
}

@Injectable()
export class CatsService {
  constructor(
    @Inject('Cats') private readonly cats: injectCats,
    @InjectRepository(Cats) private readonly catsRepository: Repository<Cats>,
  ) {
  }
   
  getHello(): injectCats {
    return this.cats;
  }

  getCats(where:CatsDto = {}): Promise<Cats[]> {
    return this.catsRepository.find({
      where,
      relations: [ 'owner' ]
    });
  }

  async createCats(params: catsType):Promise<Cats[]> {
    const catsRepList:Cats[] = [];
    for (let i of params.name) {
      const cats = new Cats();
      cats.name = i;
      const catsRep = await this.catsRepository.save(cats);
      catsRepList.push(catsRep);
    }
    return catsRepList;
  }

  async removeCatsByEntity (cats: Cats) {
    return this.catsRepository.remove(cats);
  }
}