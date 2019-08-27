import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../db/user/user.entity';
import { Repository } from 'typeorm';

type responseUser = Promise<User[]>;

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryToken')
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
  getUser(): responseUser {
    return this.userRepository.find();
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
