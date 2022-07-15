import AuthenticationController from './authentication.controller';
import AuthenticationService from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import UsersModule from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // TODO secret and secretOptions should be environment variable
    JwtModule.register({
      secret: 'topSecretFunShop',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export default class AuthenticationModule {}
