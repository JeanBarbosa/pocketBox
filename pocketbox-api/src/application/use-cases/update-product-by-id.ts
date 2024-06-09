import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';
import { Product } from '../entities/product';

interface ProductFieldsForUpdateRequest {
  name: string;
  price: number;
  category: string;
  description: string;
}

interface UpdateProductRequest {
  id: string;
  product: ProductFieldsForUpdateRequest;
}

@Injectable()
export class UpdateProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: UpdateProductRequest) {
    const { product, id } = data;

    const productForUpdate = new Product({
      id,
      ...product,
    });

    return await this.productRepository.update(id, productForUpdate);
  }
}
