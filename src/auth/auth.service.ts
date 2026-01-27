import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private get authServiceUrl(): string {
    return (
      process.env.AUTH_SERVICE_URL || 'http://localhost:3001'
    );
  }

  async validateToken(token: string) {
    try {
      const res = await axios.get(
        `${this.authServiceUrl}/auth/checkauth`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (err: any) {
      if (err?.response) {
        throw new UnauthorizedException(
          err.response.data?.message || 'Invalid token',
        );
      }
      throw new UnauthorizedException('Auth service unreachable');
    }
  }
}
