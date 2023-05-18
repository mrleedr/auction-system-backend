import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(data): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: { username: data.username },
    });
  }

  async create(data) {
    const existingEmail = await this.usersRepository.findOne({
      where: { email: data.email },
    });

    const existingUser = await this.usersRepository.findOne({
      where: { username: data.username },
    });

    if (existingEmail || existingUser) {
      throw new HttpException(
        'Username or Email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.usersRepository
      .save(data)
      .then((res) => res)
      .catch((e) => console.log(e));
  }
}
