import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProxyModule } from './proxy/proxy.module';
import { TasksController } from './tasks/tasks.controller';
import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
        ConfigModule.forRoot({
      isGlobal: true, 
    }),AuthModule, BoardsModule, ProxyModule],
  controllers: [TasksController],
})
export class AppModule {}
