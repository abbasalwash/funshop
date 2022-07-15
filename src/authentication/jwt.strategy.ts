import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import JwtPayload from './jwt-payload.interface';
import { PassportStrategy } from '@nestjs/passport';
import UsersService from 'src/users/users.service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      // TODO secret should be environment variable
      secretOrKey: 'topSecretFunShop',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.usersService.getUser(email);

    if (!user) {
      throw new UnauthorizedException('You credentials are not correct.');
    }

    return user;
  }
}
