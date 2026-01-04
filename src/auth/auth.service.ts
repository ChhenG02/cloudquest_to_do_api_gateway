import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  async validateToken(token: string) {
    try {
      const res = await axios.get(
        'http://auth-service:3001/auth/checkauth',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      // 👇 VERY IMPORTANT
      if (err.response) {
        throw new UnauthorizedException(err.response.data.message);
      }
      throw new UnauthorizedException('Auth service unreachable');
    }
  }
}
