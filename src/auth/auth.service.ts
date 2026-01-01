import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
 async validateToken(token: string) {
  const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
  
  const res = await axios.get('http://auth-service:3001/auth/checkauth', {
    headers: { 
      Authorization: `Bearer ${cleanToken}` 
    },
  });
  return res.data;
}
}
