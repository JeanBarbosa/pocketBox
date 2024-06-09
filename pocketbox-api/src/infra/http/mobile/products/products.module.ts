import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { CreateProduct } from '@/application/use-cases/create-product';
import { DatabaseModule } from '@/infra/database/database.module';
import { GetAllProducts } from '@/application/use-cases/get-all-products';
import { GetProductById } from '@/application/use-cases/get-product-by-id';
import { DeleteProductById } from '@/application/use-cases/delete-product-by-id';
import { UpdateProductById } from '@/application/use-cases/update-product-by-id';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [
    JwtService,

    //products
    CreateProduct,
    GetAllProducts,
    GetProductById,
    DeleteProductById,
    UpdateProductById,
  ],
})
export class ProductsModule {}
