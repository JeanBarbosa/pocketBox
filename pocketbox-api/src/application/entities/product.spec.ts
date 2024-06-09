import { Product } from './product';
import { randomUUID } from 'node:crypto';

describe('Product Entity', () => {
  it('should be able to create a product', () => {
    const product = new Product({
      id: randomUUID(),
      name: 'Product 1',
      price: 10,
      category: 'Product 1 category',
      description: 'Product 1 description',
    });

    expect(product).toBeTruthy();
  });
});
