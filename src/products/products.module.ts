import AuthenticationModule from 'src/authentication/authentication.module';
import BrandsModule from 'src/brands/brands.module';
import { Module } from '@nestjs/common';
import Product from './product.entity';
import ProductsController from './products.controller';
import ProductsService from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    BrandsModule,
    AuthenticationModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export default class ProductsModule {}
