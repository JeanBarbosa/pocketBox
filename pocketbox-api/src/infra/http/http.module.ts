import { Module } from '@nestjs/common';
import { MobileModule } from './mobile/mobile.module';

@Module({
  imports: [MobileModule],
  providers: [],
  exports: [],
})
export class HttpModule {}
