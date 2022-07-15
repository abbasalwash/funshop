import AuthenticationController from './authentication.controller';
import AuthenticationService from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import JwtStrategy from './jwt.strategy';
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
  providers: [AuthenticationService, JwtStrategy],
  controllers: [AuthenticationController],
  exports: [JwtStrategy, PassportModule],
})
export default class AuthenticationModule {}
