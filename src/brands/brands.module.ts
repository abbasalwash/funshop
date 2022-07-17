import AuthenticationModule from 'src/authentication/authentication.module';
import Brand from './brand.entity';
import BrandsController from './brands.controller';
import BrandsService from './brands.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), AuthenticationModule],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export default class BrandsModule {}
