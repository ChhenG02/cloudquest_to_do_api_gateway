import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ProxyService } from '../proxy/proxy.service';

@Controller('auth')
export class AuthController {
  constructor(private proxy: ProxyService) {}

  private get authServiceUrl(): string {
    return (
      process.env.AUTH_SERVICE_URL || 'http://localhost:3001'
    );
  }

  @Post('signup')
  signup(@Req() req: any) {
    return this.proxy.forward(
      req,
      `${this.authServiceUrl}/auth/signup`,
    );
  }

  @Post('login')
  login(@Req() req: any) {
    return this.proxy.forward(
      req,
      `${this.authServiceUrl}/auth/login`,
    );
  }

  @Get('checkauth')
  validate(@Req() req: any) {
    return this.proxy.forward(
      req,
      `${this.authServiceUrl}/auth/checkauth`,
    );
  }

  @Get('users/search')
  searchUsers(@Query('q') query: string, @Req() req: any) {
    return this.proxy.forward(
      req,
      `${this.authServiceUrl}/auth/users/search?q=${encodeURIComponent(
        query || '',
      )}`,
    );
  }

  @Post('users/batch')
  batchUsers(@Req() req: any) {
    return this.proxy.forward(
      req,
      `${this.authServiceUrl}/auth/users/batch`,
    );
  }
}
