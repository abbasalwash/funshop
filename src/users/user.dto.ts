import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

// TODO create validator
export default class UserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(40)
  email: string;

  @IsNotEmpty()
  @MaxLength(25)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(25)
  lastName: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
