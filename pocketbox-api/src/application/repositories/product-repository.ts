import { Product } from '../entities/product';

export abstract class ProductRepository {
  abstract create(data: Product): Promise<Product>;
  abstract findOne(productId: string): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
  abstract update(productId: string, product: Product): Promise<Product>;
  abstract delete(productId: string): Promise<Product>;
}
