import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = Number(process.env.PORT) || 8000;
  const CORS_ORIGIN =
    process.env.CORS_ORIGIN ||
    'http://ec2-44-192-61-145.compute-1.amazonaws.com:3000';

  // ✅ Enable CORS
  app.enableCors({
    origin: CORS_ORIGIN,
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ✅ IMPORTANT: handle OPTIONS before proxying
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', CORS_ORIGIN);
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
      );
      return res.sendStatus(204);
    }
    next();
  });

  app.use(cookieParser());

  await app.listen(PORT, '0.0.0.0');
  console.log(`✅ API Gateway running on ${PORT}`);
}

bootstrap();
