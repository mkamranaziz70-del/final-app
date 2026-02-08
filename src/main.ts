import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useStaticAssets(
    path.join(process.cwd(), 'uploads'),
    { prefix: '/uploads' }
  );

  // ✅ CLOUD RUN FRIENDLY
  const port = Number(process.env.PORT) || 8080;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();
