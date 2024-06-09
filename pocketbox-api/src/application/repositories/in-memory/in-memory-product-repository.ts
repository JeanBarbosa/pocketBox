import { Product } from '../../entities/product';
import { ProductRepository } from '../product-repository';

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = [];

  constructor() {}

  async create(data: Product): Promise<Product> {
    const length = this.items.push(data);
    return this.items[length - 1];
  }

  async findAll(): Promise<Product[]> {
    return Promise.resolve(this.items);
  }

  async findOne(id: string): Promise<Product> {
    return Promise.resolve(this.items.find((item) => item.id === id));
  }

  async update(id: string, product: Product): Promise<Product> {
    const index = this.items.findIndex((item) => item.id === id);
    this.items[index] = product;
    return Promise.resolve(product);
  }

  async delete(id: string): Promise<Product> {
    const index = this.items.findIndex((item) => item.id === id);
    const product = this.items[index];
    this.items.splice(index, 1);
    return Promise.resolve(product);
  }
}
