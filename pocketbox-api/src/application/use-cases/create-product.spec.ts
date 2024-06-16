import { InMemoryProductRepository } from '../repositories/in-memory/in-memory-product-repository';
import { CreateProduct } from './create-product';

describe('Products create', () => {
  it('should be able to create product', async () => {
    const productRepository = new InMemoryProductRepository();
    const createProduct = new CreateProduct(productRepository);

    const productData = {
      userId: 'user-1',
      name: 'Product 1',
      price: 10,
      image: 'image.jpg',
      quantity: 10,
      category: 'Product 1 category',
      description: 'Product 1 description',
    };

    const product = await createProduct.execute(productData);

    expect(productRepository.items).toHaveLength(1);
  });
});
