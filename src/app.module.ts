import BrandModule from './brands/brand.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BrandModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
