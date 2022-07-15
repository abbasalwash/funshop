import { IsNotEmpty, Max } from 'class-validator';

// TODO create validator
export default class BrandDto {
  @IsNotEmpty()
  @Max(50)
  name: string;
}
