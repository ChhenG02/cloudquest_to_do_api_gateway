import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ProxyService } from '../proxy/proxy.service';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(  
    private proxy: ProxyService,
    private jwtAuthGuard: JwtAuthGuard, 
  ) {}

  @Post()
  createBoard(@Req() req) {
    return this.proxy.forward(req, 'http://board-service:3002/boards');
  }
}