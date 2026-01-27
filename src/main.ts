import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const PORT = process.env.PORT || '3000';
  const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

  app.enableCors({
    origin: CORS_ORIGIN.split(','), 
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  });

  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(Number(PORT), '0.0.0.0');

  console.log(`Application running on port ${PORT}`);
  console.log(`CORS enabled for: ${CORS_ORIGIN}`);
}

bootstrap();
