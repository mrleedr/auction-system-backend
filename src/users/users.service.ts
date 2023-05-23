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

  async profile(id: string) {
    const { password, ...rest } = await this.usersRepository.findOne({
      where: { id: id },
    });

    return rest;
  }

  async deposit(id: string, amount: number) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });

    user.balance += amount;

    try {
      return await this.usersRepository.save(user);
    } catch (e) {
      console.log(e);
      throw new Error('Failed to update user balance');
    }
  }
}
