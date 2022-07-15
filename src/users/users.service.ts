import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SqliteErrorCode } from 'src/database/sqliteErrorCode';
import { Repository } from 'typeorm';
import UserDto from './user.dto';
import User from './user.entity';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(user: UserDto) {
    try {
      const newUser = this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
    } catch (error) {
      if (error?.errno === SqliteErrorCode.UniqueViolation) {
        throw new HttpException(
          `Email with name: ${user.email} already exists.`,
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  async getUser(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
