import { IsNotEmpty, MaxLength } from 'class-validator';

// TODO create validator
export default class BrandDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
