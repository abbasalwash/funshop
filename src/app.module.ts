import AuthenticationModule from './authentication/authentication.module';
import BrandsModule from './brands/brands.module';
import DatabaseModule from './database/database.module';
import { Module } from '@nestjs/common';
import ProductsModule from './products/products.module';

@Module({
  imports: [BrandsModule, DatabaseModule, AuthenticationModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
