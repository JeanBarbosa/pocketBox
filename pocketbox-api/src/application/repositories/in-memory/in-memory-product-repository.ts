import { Product } from '../../entities/product';
import { ProductRepository } from '../product-repository';

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = [];

  constructor() {}

  async create(data: Product): Promise<Product> {
    const length = this.items.push(data);
    return this.items[length - 1];
  }
}
