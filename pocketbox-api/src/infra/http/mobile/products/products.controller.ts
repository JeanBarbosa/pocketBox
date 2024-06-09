import { Product } from '@/application/entities/product';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProduct } from '@/application/use-cases/create-product';
import { GetAllProducts } from '@/application/use-cases/get-all-products';
import { GetProductById } from '@/application/use-cases/get-product-by-id';
import { DeleteProductById } from '@/application/use-cases/delete-product-by-id';
import { UpdateProductById } from '@/application/use-cases/update-product-by-id';
import { AuthGuard } from '../../auth/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user';
import { User } from '@/application/entities/user';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProduct: CreateProduct,
    private readonly getAllProducts: GetAllProducts,
    private readonly getProductById: GetProductById,
    private readonly deleteProductById: DeleteProductById,
    private readonly updateProductById: UpdateProductById,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.createProduct.execute(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.getAllProducts.execute();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: Pick<User, 'id' | 'email' | 'firstName'>,
  ): Promise<Product> {
    return await this.getProductById.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Product> {
    return await this.updateProductById.execute({
      id,
      product,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return await this.deleteProductById.execute(id);
  }
}
