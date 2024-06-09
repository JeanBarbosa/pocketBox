import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';

@Injectable()
export class DeleteProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string) {
    const product = await this.productRepository.delete(id);
    return product;
  }
}
