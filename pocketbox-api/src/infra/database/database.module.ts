import { Module } from '@nestjs/common';
import { mongoDBProviders } from './mongoDB/mongo.providers';

@Module({
  providers: [...mongoDBProviders],
  exports: [...mongoDBProviders],
})
export class DatabaseModule {}
