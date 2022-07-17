import { IsNotEmpty, IsNumber, IsPositive, MaxLength } from 'class-validator';

export default class ProductDto {
  @IsNotEmpty()
  @MaxLength(100)
  type: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  brandId: string;
}
