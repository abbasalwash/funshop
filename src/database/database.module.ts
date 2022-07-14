import Brand from 'src/brands/brand.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'funshop.db',
      entities: [Brand],
      synchronize: true,
    }),
  ],
})
export default class DatabaseModule {}
