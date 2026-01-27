import {
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProxyService {
  async forward(req: any, targetUrl: string) {
    const { method, body, headers, user } = req;

    try {
      const response = await axios({
        method,
        url: targetUrl,
        data: body,
        headers: {
          ...headers,

          // Forward user info (optional)
          'x-user-id': user?.sub || user?.userId || user?.id,

          // Remove conflicting headers
          host: undefined,
          'content-length': undefined,
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        '❌ ProxyService Error:',
        error.response?.data || error.message,
      );

      if (error.response) {
        throw new HttpException(
          error.response.data || {
            message: 'Error from auth service',
          },
          error.response.status,
        );
      }

      // Network / service down
      throw new InternalServerErrorException(
        'Target service unavailable',
      );
    }
  }
}
