import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProxyModule } from './proxy/proxy.module';
import { BoardsController } from './boards/boards.controller';
import { TasksController } from './tasks/tasks.controller';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [AuthModule, BoardsModule, ProxyModule],
  controllers: [TasksController],
})
export class AppModule {}
