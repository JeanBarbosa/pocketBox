import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';

interface GetAllProductsRequest {
  userId: string;
}

@Injectable()
export class GetAllProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute({ userId }: GetAllProductsRequest) {
    const products = await this.productRepository.findAll(userId);
    return products.map((product) => product.toJSON());
  }
}
