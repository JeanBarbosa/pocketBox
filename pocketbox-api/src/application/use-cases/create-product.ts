import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';
import { Product } from '../entities/product';

interface CreateProductRequest {
  name: string;
  price: number;
  category: string;
  description: string;
}

@Injectable()
export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: CreateProductRequest) {
    const product = new Product(data);

    return await this.productRepository.create(product);
  }
}
