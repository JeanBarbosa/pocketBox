import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import validationOptions from '@/shared/utils/validation-options';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  await app.listen(configService.get('app.port')).then(() => {
    console.log(`Application is running on: ${configService.get('app.port')}`);
  });
}
bootstrap();
