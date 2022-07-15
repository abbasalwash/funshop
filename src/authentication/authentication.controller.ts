import { Body, Controller, Post } from '@nestjs/common';
import UserDto from 'src/users/user.dto';
import AuthenticationDto from './authentication.dto';
import AuthenticationService from './authentication.service';

@Controller('authentication')
export default class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return this.authenticationService.signUp(user);
  }

  @Post('signin')
  async signIn(@Body() authenticationDto: AuthenticationDto) {
    return this.authenticationService.signin(authenticationDto);
  }
}
