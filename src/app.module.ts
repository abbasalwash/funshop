import BrandsModule from './brands/brands.module';
import DatabaseModule from './database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BrandsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
