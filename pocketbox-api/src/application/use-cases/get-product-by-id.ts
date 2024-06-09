import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';

interface GetProductByIdRequest {
  id: string;
  userId: string;
}

@Injectable()
export class GetProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute({ id, userId }: GetProductByIdRequest) {
    const productExists = await this.productRepository.findOne(id);

    if (!productExists) {
      throw new Error('Product not found');
    }

    if (productExists.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return productExists;
  }
}
