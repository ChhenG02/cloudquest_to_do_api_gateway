import {
  Controller,
  Get,
  Post,
  Patch,
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

  // ✅ GET tasks by board
  @Get('board/:boardId')
  getByBoard(@Param('boardId') boardId: string, @Req() req) {
    return this.proxy.forward(req, `http://task-service:3003/tasks/board/${boardId}`);
  }

  // ✅ update status
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Req() req) {
    return this.proxy.forward(req, `http://task-service:3003/tasks/${id}/status`);
  }

  // ✅ assign users
  @Patch(':id/assign')
  assign(@Param('id') id: string, @Req() req) {
    return this.proxy.forward(req, `http://task-service:3003/tasks/${id}/assign`);
  }

  // ✅ get assignees
  @Get(':id/assignees')
  getAssignees(@Param('id') id: string, @Req() req) {
    return this.proxy.forward(req, `http://task-service:3003/tasks/${id}/assignees`);
  }
}
