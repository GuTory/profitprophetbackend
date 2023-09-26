import { NestFactory } from '@nestjs/core';
import { AppModule } from './root/app.module';
import { json, urlencoded } from 'express';

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(3000);
}
bootstrap();
