import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';

@Injectable()
export class GetProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string) {
    const product = await this.productRepository.findOne(id);
    return product;
  }
}
