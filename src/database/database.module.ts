import Brand from 'src/brands/brand.entity';
import { Module } from '@nestjs/common';
import Product from 'src/products/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'funshop-sqlite.db',
      entities: [Brand, Product, User],
      synchronize: true,
    }),
  ],
})
export default class DatabaseModule {}
