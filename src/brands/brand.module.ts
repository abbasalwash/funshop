import BrandsController from './brand.controller';
import BrandsService from './brands.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export default class BrandModule {}
