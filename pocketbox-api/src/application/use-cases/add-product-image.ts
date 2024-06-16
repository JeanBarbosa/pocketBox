import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';
import { Product } from '../entities/product';

interface UpdateProductRequest {
  userId: string;
  id: string;
  image: string;
}

@Injectable()
export class AddProductImage {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: UpdateProductRequest) {
    const { id, image, userId } = data;

    const productExists = await this.productRepository.findOne(id);

    if (!productExists) {
      throw new Error('Product not found');
    }

    if (productExists.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const productForUpdate = new Product({
      id,
      ...productExists.toJSON(),
      image,
    });

    return await this.productRepository.update(id, productForUpdate);
  }
}
