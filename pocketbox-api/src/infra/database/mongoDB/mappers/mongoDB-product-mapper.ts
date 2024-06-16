import { Product } from '@/application/entities/product';
import { Document } from 'mongoose';

export class MongoDBProductMapper {
  static toMongoDB(product: Product) {
    return {
      name: product.name,
      userId: product.userId,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
      category: product.category,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toDomain(data: Document & Product): Product {
    return new Product({
      id: data._id.toString(),
      userId: data.userId,
      name: data.name,
      price: data.price,
      image: data.image,
      quantity: data.quantity,
      category: data.category,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
