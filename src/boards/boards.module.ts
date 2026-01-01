import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { ProxyModule } from '../proxy/proxy.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Module({
  imports: [
    ProxyModule, 
    AuthModule, 
  ],
  controllers: [BoardsController],
  providers: [JwtAuthGuard], 
})
export class BoardsModule {}