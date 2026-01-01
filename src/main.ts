import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser'; // ✅ default import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); // <-- this enables req.cookies
  await app.listen(3000);
}
bootstrap();
