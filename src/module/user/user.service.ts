import { Injectable, Inject } from '@nestjs/common';
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
  createUser(): Promise<string> {
    const user = new User();
    user.name = 'dmy';
    return this.userRepository
      .save(user)
      .then(res => {
        return '创建成功！';
      })
      .catch(err => {
        return err;
      });
  }
  getUser(where = {}): responseUser {
    return this.userRepository.find(where);
  }

  async updateUser(): responseUser {
    const data = await this.userRepository.find();
    for (let item of data) {
      item.name = 'xiaoming';
    }
    return this.userRepository.save(data);
  }

  async deleteUser(): responseUser {
    const data = await this.userRepository.find({
      name: 'xiaoming'
    });
    return this.userRepository.remove(data);
  }
}
