import { InMemoryProductRepository } from '../repositories/in-memory/in-memory-product-repository';
import { CreateProduct } from './create-product';
import { UpdateProductById } from './update-product-by-id';

describe('Products update', () => {
  it('should be able to update product by id', async () => {
    const productRepository = new InMemoryProductRepository();
    const userId = 'user-1';
    const createProduct = new CreateProduct(productRepository);
    const productUpdate = new UpdateProductById(productRepository);

    const productData = {
      userId,
      name: 'Product 1',
      price: 10,
      category: 'Product 1 category',
      description: 'Product 1 description',
    };

    const product = await createProduct.execute(productData);

    const updatedProduct = await productUpdate.execute({
      product: {
        name: 'Product 1 updated',
      },
      id: product.id,
      userId,
    });

    expect(updatedProduct.name).toEqual('Product 1 updated');
  });
});
