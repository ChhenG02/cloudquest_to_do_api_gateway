import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ProxyService } from '../proxy/proxy.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private proxy: ProxyService) {}

  @Get()
  getTasks(@Req() req) {
    return this.proxy.forward(req, 'http://task-service:3003/tasks');
  }

  @Post()
  createTask(@Req() req) {
    return this.proxy.forward(req, 'http://task-service:3003/tasks');
  }
}
