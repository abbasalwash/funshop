import BrandModule from './brands/brand.module';
import DatabaseModule from './database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BrandModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
