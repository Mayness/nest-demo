import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

type responseUser = Promise<User[]>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(name: string): Promise<User> {
    const user = new User();
    user.name = name;
    return this.userRepository
      .save(user)
      .then(res => {
        return user;
      })
      .catch(err => {
        return err;
      });
  }
  getUser(where = {}): responseUser {
    return this.userRepository.find(where);
  }

  async updateUser({ id, name }): Promise<User|{}> {
    const data = await this.userRepository.find();
    let res = {};
    data.forEach(item => {
      if (item.id === id) {
        item.name = name;
        res = item;
      }
    })
    this.userRepository.save(data);
    return res;
  }

  async deleteUser(id: string): Promise<User|{}> {
    let res;
    const data = await this.userRepository.findByIds([ id ]);
    res = Object.assign({}, data[ 0 ]);
    if (data.length > 0) {
      await this.userRepository.remove(data);
      return res;
    }
    return {};
  }
}
