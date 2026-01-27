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

  private attachUserIdHeader(req: any) {
    const userId = req.user?.userId ?? req.user?.id ?? req.user?.sub;
    if (userId) req.headers['x-user-id'] = String(userId);
  }

  private get taskServiceUrl(): string {
    return (
      process.env.TASK_SERVICE_URL || 'http://localhost:3003'
    );
  }

  @Post()
  createTask(@Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(req, `${this.taskServiceUrl}/tasks`);
  }

  @Get('board/:boardId')
  getByBoard(@Param('boardId') boardId: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.taskServiceUrl}/tasks/board/${boardId}`,
    );
  }

  @Get(':id')
  getDetail(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.taskServiceUrl}/tasks/${id}`,
    );
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.taskServiceUrl}/tasks/${id}/status`,
    );
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.taskServiceUrl}/tasks/${id}`,
    );
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.taskServiceUrl}/tasks/${id}`,
    );
  }

  @Patch(':id/assign')
  assign(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.taskServiceUrl}/tasks/${id}/assign`,
    );
  }

  @Get(':id/assignees')
  getAssignees(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.taskServiceUrl}/tasks/${id}/assignees`,
    );
  }

  @Patch(':id/assignees')
  setAssignees(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.taskServiceUrl}/tasks/${id}/assignees`,
    );
  }

  @Delete('board/:boardId')
  deleteTasksByBoard(@Param('boardId') boardId: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.taskServiceUrl}/tasks/board/${boardId}`,
    );
  }
}
