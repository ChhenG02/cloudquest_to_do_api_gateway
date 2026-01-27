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
    const userId = req.user?.userId ?? req.user?.id ?? req.user?.sub;
    if (userId) req.headers['x-user-id'] = String(userId);
  }

  private get boardServiceUrl(): string {
    return (
      process.env.BOARD_SERVICE_URL || 'http://localhost:3002'
    );
  }

  @Post()
  createBoard(@Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.boardServiceUrl}/boards`,
    );
  }

  @Get()
  getAllBoards(@Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.boardServiceUrl}/boards`,
    );
  }

  @Get(':id')
  getBoardDetail(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.boardServiceUrl}/boards/${id}`,
    );
  }

  @Post(':id/share')
  shareBoard(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.boardServiceUrl}/boards/${id}/share`,
    );
  }

  @Patch(':id/members/:memberUserId')
  updateMemberRole(
    @Param('id') id: string,
    @Param('memberUserId') memberUserId: string,
    @Req() req: any,
  ) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.boardServiceUrl}/boards/${id}/members/${memberUserId}`,
    );
  }

  @Delete(':id')
  deleteBoard(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.boardServiceUrl}/boards/${id}`,
    );
  }

  @Get(':id/members')
  getMembers(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.boardServiceUrl}/boards/${id}/members`,
    );
  }

  @Delete(':id/members/:memberUserId')
  removeMember(
    @Param('id') id: string,
    @Param('memberUserId') memberUserId: string,
    @Req() req: any,
  ) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.boardServiceUrl}/boards/${id}/members/${memberUserId}`,
    );
  }

  @Get(':id/role')
  getMyRole(@Param('id') id: string, @Req() req: any) {
    this.attachUserIdHeader(req);
    return this.proxy.forward(
      req,
      `${this.boardServiceUrl}/boards/${id}/role`,
    );
  }
}
