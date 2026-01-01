import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    let token = request.headers.authorization;

    if (!token && request.cookies?.jwt) {
      token = `Bearer ${request.cookies.jwt}`;
    }

    if (!token) throw new UnauthorizedException('No token provided');

    if (token.startsWith('Bearer ')) token = token.slice(7);

    try {
      const res = await this.authService.validateToken(token);
      request.user = res.payload;
      return true;
    } catch (err) {
      console.error('❌ Validation error:', err.response?.data || err.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
