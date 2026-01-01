import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; 
import { ProxyModule } from '../proxy/proxy.module'; 

@Module({
  imports: [ProxyModule], 
  providers: [AuthService],
  controllers: [AuthController], 
  exports: [AuthService],
})
export class AuthModule {}