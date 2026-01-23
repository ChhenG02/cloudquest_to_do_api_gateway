import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ProxyService } from '../proxy/proxy.service';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private proxy: ProxyService) {}

  private attachUserIdHeader(req: any) {
    // depends on what your JwtStrategy sets in req.user
    const userId = req.user?.userId ?? req.user?.id ?? req.user?.sub;
    if (userId) req.headers['x-user-id'] = String(userId);
  }

  @Post()
  createBoard(@Req() req) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(req, 'http://board-service:3002/boards');
  }

  @Get()
  getAllBoards(@Req() req) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(req, 'http://board-service:3002/boards');
  }

  // ✅ NEW: view board detail
  @Get(':id')
  getBoardDetail(@Param('id') id: string, @Req() req) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(req, `http://board-service:3002/boards/${id}`);
  }

  @Post(':id/share')
  shareBoard(@Param('id') id: string, @Req() req) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `http://board-service:3002/boards/${id}/share`,
    );
  }

  @Patch(':id/members/:memberUserId')
  updateMemberRole(
    @Param('id') id: string,
    @Param('memberUserId') memberUserId: string,
    @Req() req,
  ) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `http://board-service:3002/boards/${id}/members/${memberUserId}`,
    );
  }

  @Delete(':id')
  deleteBoard(@Param('id') id: string, @Req() req) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(req, `http://board-service:3002/boards/${id}`);
  }

  @Get(':id/members')
  getMembers(@Param('id') id: string, @Req() req) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `http://board-service:3002/boards/${id}/members`,
    );
  }

  @Delete(':id/members/:memberUserId')
  removeMember(
    @Param('id') id: string,
    @Param('memberUserId') memberUserId: string,
    @Req() req,
  ) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `http://board-service:3002/boards/${id}/members/${memberUserId}`,
    );
  }

  @Get(':id/role')
  getMyRole(@Param('id') id: string, @Req() req) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `http://board-service:3002/boards/${id}/role`,
    );
  }
}
