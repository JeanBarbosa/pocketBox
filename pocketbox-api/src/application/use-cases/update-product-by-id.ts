import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';
import { Product } from '../entities/product';

interface ProductFieldsForUpdateRequest {
  name?: string;
  price?: number;
  category?: string;
  description?: string;
}

interface UpdateProductRequest {
  id: string;
  userId: string;
  product: ProductFieldsForUpdateRequest;
}

@Injectable()
export class UpdateProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: UpdateProductRequest) {
    const { product, id, userId } = data;

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
      ...product,
    });

    return await this.productRepository.update(id, productForUpdate);
  }
}
