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
  createUser(name: string): Promise<string> {
    const user = new User();
    user.name = name;
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

  async updateUser({ id, name }): responseUser {
    const data = await this.userRepository.find();
    data.forEach(item => {
      if (item.id === id) item.name = name;
    })
    return this.userRepository.save(data);
  }

  async deleteUser(id: number): responseUser {
    const data = await this.userRepository.findByIds([ id ]);
    return this.userRepository.remove(data);
  }
}
