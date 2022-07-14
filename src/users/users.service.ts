import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserDto from './user.dto';
import User from './user.entity';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with email: ${email} does not exist.',
      HttpStatus.NOT_FOUND,
    );
  }

  async createUser(user: UserDto) {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);

    return newUser;
  }
}
