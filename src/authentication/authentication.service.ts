import * as bcrypt from 'bcrypt';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import RegisterDto from './dto/register.dto';
import { SqliteErrorCode } from 'src/database/sqliteErrorCode';
import UsersService from 'src/users/users.service';

@Injectable()
export default class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    try {
      const createdUser = await this.usersService.createUser({
        ...registerData,
        password: hashedPassword,
      });
      // TODO code smell, should be solved cleaner
      createdUser.password = '';

      return createdUser;
    } catch (error) {
      if (error?.errno === SqliteErrorCode.UniqueViolation) {
        throw new HttpException(
          `User with email: ${registerData.email} already exists.`,
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  async getAuthenticatedUser(email: string, nonHashedPassword: string) {
    const user = await this.usersService.getByEmail(email);
    await this.verifyPassword(nonHashedPassword, user.password);
    // TODO code smell, should be solved cleaner
    user.password;

    return user;
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
