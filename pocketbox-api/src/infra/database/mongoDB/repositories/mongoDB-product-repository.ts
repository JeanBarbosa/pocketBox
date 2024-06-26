import { ProductRepository } from '@/application/repositories/product-repository';
import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@/application/entities/product';
import { MongoDBProductMapper } from '../mappers/mongoDB-product-mapper';

@Injectable()
export class MongoDBProductRepository implements ProductRepository {
  constructor(
    @Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: Product): Promise<Product> {
    const createdProduct = await this.productModel.create(
      MongoDBProductMapper.toMongoDB(createProductDto),
    );
    return MongoDBProductMapper.toDomain(createdProduct);
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      return null;
    }

    return MongoDBProductMapper.toDomain(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();

    //Todo User Either
    if (!products) {
      return [];
    }

    return products.map(MongoDBProductMapper.toDomain);
  }
  async update(id: string, product: Product): Promise<Product> {
    const productUpdated = await this.productModel.findByIdAndUpdate(
      { _id: id, userId: product.userId },
      MongoDBProductMapper.toMongoDB(product),
      {
        new: true,
      },
    );

    return MongoDBProductMapper.toDomain(productUpdated);
  }

  async delete(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(id);
    return MongoDBProductMapper.toDomain(product);
  }
}
