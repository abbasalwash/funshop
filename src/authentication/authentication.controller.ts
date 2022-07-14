import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import AuthenticationService from './authentication.service';
import RegisterDto from './dto/register.dto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('authentication')
export default class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    return this.authenticationService.register(registerData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    // TODO code smell, should be solved cleaner
    const user = request.user;
    user.password = '';

    return user;
  }
}
