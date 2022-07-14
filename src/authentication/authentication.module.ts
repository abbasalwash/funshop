import AuthenticationController from './authentication.controller';
import AuthenticationService from './authentication.service';
import LocalStrategy from './local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import UsersModule from 'src/users/users.module';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthenticationService, LocalStrategy],
  controllers: [AuthenticationController],
})
export default class AuthenticationModule {}
