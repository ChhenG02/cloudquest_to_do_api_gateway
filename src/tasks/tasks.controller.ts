import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ProxyService } from '../proxy/proxy.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private proxy: ProxyService) {}

  @Post()
  createTask(@Req() req) {
    return this.proxy.forward(req, 'http://task-service:3003/tasks');
  }

  @Get('board/:boardId')
  getByBoard(@Param('boardId') boardId: string, @Req() req) {
    return this.proxy.forward(
      req,
      `http://task-service:3003/tasks/board/${boardId}`,
    );
  }

  @Get(':id')
  getDetail(@Param('id') id: string, @Req() req) {
    return this.proxy.forward(req, `http://task-service:3003/tasks/${id}`);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Req() req) {
    return this.proxy.forward(
      req,
      `http://task-service:3003/tasks/${id}/status`,
    );
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Req() req) {
    return this.proxy.forward(req, `http://task-service:3003/tasks/${id}`);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @Req() req) {
    return this.proxy.forward(req, `http://task-service:3003/tasks/${id}`);
  }

  @Patch(':id/assign')
  assign(@Param('id') id: string, @Req() req) {
    return this.proxy.forward(
      req,
      `http://task-service:3003/tasks/${id}/assign`,
    );
  }

  @Get(':id/assignees')
  getAssignees(@Param('id') id: string, @Req() req) {
    return this.proxy.forward(
      req,
      `http://task-service:3003/tasks/${id}/assignees`,
    );
  }

  @Delete('board/:boardId')
  deleteTasksByBoard(@Param('boardId') boardId: string, @Req() req) {
    return this.proxy.forward(
      req,
      `http://task-service:3003/tasks/board/${boardId}`,
    );
  }
}
