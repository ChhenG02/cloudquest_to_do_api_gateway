import { Controller, Get, Post, Req } from '@nestjs/common';
import { ProxyService } from '../proxy/proxy.service';

@Controller('auth') 
export class AuthController {
  constructor(private proxy: ProxyService) {}

  @Post('signup')
  signup(@Req() req) {
    return this.proxy.forward(req, 'http://auth-service:3001/auth/signup');
  }

  @Post('login') 
  login(@Req() req) {
    return this.proxy.forward(req, 'http://auth-service:3001/auth/login');
  }

  @Get('checkauth')
  validate(@Req() req) {
    return this.proxy.forward(req, 'http://auth-service:3001/auth/checkauth');
  }
}