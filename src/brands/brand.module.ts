import Brand from './brand.entity';
import BrandsController from './brand.controller';
import BrandsService from './brands.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export default class BrandModule {}
