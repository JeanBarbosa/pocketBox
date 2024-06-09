import { Product } from '../entities/product';

export abstract class ProductRepository {
  abstract create(data: Product): Promise<Product>;
  abstract create(createCatDto: Product): Promise<Product>;
  abstract findOne(id: string): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
  abstract update(id: string, product: Product): Promise<Product>;
  abstract delete(id: string): Promise<Product>;
}
