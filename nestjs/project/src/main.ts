import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 스키마에서 class validation을 사용하려면 등록이 필요
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT!);
}
bootstrap();
