import { Product } from '@/application/entities/product';
import { Document } from 'mongoose';

export class MongoDBProductMapper {
  static toMongoDB(product: Product) {
    return {
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toDomain(data: Document & Product): Product {
    return new Product({
      id: data._id.toString(),
      name: data.name,
      price: data.price,
      category: data.category,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
