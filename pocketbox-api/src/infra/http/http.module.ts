import { Module } from '@nestjs/common';
import { MobileModule } from './mobile/mobile.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MobileModule],
  providers: [],
  exports: [],
})
export class HttpModule {}
