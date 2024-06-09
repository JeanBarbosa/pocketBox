import { Module } from '@nestjs/common';
import { mongoDBProviders } from './mongoDB/providers/mongo.providers';
import { productsProviders } from './mongoDB/providers/products.providers';
import { ProductRepository } from '@/application/repositories/product-repository';
import { MongoDBProductRepository } from './mongoDB/repositories/mongoDB-product-repository';
import { ConfigModule } from '@nestjs/config';
import { usersProviders } from './mongoDB/providers/users.providers';
import { UserRepository } from '@/application/repositories/user-repository';
import { MongoDBUserRepository } from './mongoDB/repositories/mongoDB-user-repository';

@Module({
  imports: [ConfigModule],
  providers: [
    ...mongoDBProviders,
    ...usersProviders,
    ...productsProviders,
    {
      provide: UserRepository,
      useClass: MongoDBUserRepository,
    },
    {
      provide: ProductRepository,
      useClass: MongoDBProductRepository,
    },
  ],
  exports: [...mongoDBProviders, ProductRepository, UserRepository],
})
export class DatabaseModule {}
