import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserArg } from './dto/user.arg';
import { CatsService } from '../cats/cats.service';

type responseUser = Promise<User[]>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly catsService: CatsService
  ) {}

  async createUser(params: CreateUserArg): Promise<User> {
    const cats = await this.catsService.createCats({
      name: params.cats
    });
    const user = new User();
    user.name = params.name;
    user.cats = cats;
    return this.userRepository.save(user)
  }
  getUser(where = {}): responseUser {
    return this.userRepository.find({
      where,
      relations: [ 'cats' ]
    });
  }

  async updateUser({ id, name }): Promise<User|{}> {
    const data = await this.userRepository.find({ id });
    let res = {};
    data.forEach(item => {
      if (String(item.id) === id) {
        item.name = name;
        res = item;
      }
    })
    this.userRepository.save(data);
    return res;
  }

  async deleteUser(id: string): Promise<User|{}> {
    let res;
    const data = await this.userRepository.find({
      where: {
        id,
      },
      relations: [ 'cats' ]
    });
    res = Object.assign({}, data[ 0 ]);
    if (data.length > 0) {
      if (res.cats) await this.catsService.removeCatsByEntity(res.cats);
      await this.userRepository.remove(data);
      return res;
    }
    return {};
  }
}
