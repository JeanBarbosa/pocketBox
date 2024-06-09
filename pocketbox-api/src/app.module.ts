import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig],
      envFilePath: ['.env'],
    }),
    InfraModule,
  ],
})
export class AppModule {}
