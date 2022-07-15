import AuthenticationController from './authentication.controller';
import AuthenticationService from './authentication.service';
import { Module } from '@nestjs/common';
import UsersModule from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export default class AuthenticationModule {}
