import * as bcrypt from 'bcrypt';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import AuthenticationDto from './authentication.dto';
import JwtPayload from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/user.entity';
import UserDto from 'src/users/user.dto';
import UsersService from 'src/users/users.service';

@Injectable()
export default class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: UserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    return this.usersService.createUser(user);
  }

  async signin(authenticationDto: AuthenticationDto) {
    const user = await this.usersService.getUser(authenticationDto.email);

    if (user && (await this.verifyPassword(authenticationDto, user))) {
      const payload: JwtPayload = { email: user.email };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    }

    throw new UnauthorizedException('You credentials are not correct.');
  }

  private async verifyPassword(
    authenticationDto: AuthenticationDto,
    user: User,
  ) {
    return await bcrypt.compare(authenticationDto.password, user.password);
  }
}
