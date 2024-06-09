import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';

interface DeleteProductByIdRequest {
  id: string;
  userId: string;
}

@Injectable()
export class DeleteProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute({ id, userId }: DeleteProductByIdRequest) {
    const productExists = await this.productRepository.findOne(id);

    if (!productExists) {
      throw new Error('Product not found');
    }

    if (productExists.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await this.productRepository.delete(id);
  }
}
