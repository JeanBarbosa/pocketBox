import { Product } from '../entities/product';

export type FetchArgs = {
  skip: number;
  take: number;
};

export abstract class ProductRepository {
  abstract create(data: Product): Promise<Product>;
}
