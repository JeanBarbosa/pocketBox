import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';

@Injectable()
export class GetAllProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute() {
    const products = await this.productRepository.findAll();
    return products.map((product) => product.toJSON());
  }
}
