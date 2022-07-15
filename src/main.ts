import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO port should be environment variable
  await app.listen(3000);
}
bootstrap();
