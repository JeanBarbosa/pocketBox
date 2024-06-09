import { Module } from '@nestjs/common';

import { HttpModule } from '@infra/http/http.module';
import { AuthModule } from './http/auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  exports: [],
})
export class InfraModule {}
