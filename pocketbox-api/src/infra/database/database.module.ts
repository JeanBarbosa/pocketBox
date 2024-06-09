import { Module } from '@nestjs/common';
import { mongoDBProviders } from './mongoDB/providers/mongo.providers';
import { productsProviders } from './mongoDB/providers/products.providers';
import { ProductRepository } from '@/application/repositories/product-repository';
import { MongoDBProductRepository } from './mongoDB/repositories/mongoDB-product-repository';

@Module({
  providers: [
    ...mongoDBProviders,
    ...productsProviders,
    {
      provide: ProductRepository,
      useClass: MongoDBProductRepository,
    },
  ],
  exports: [...mongoDBProviders, ProductRepository],
})
export class DatabaseModule {}
