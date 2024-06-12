import { AuthGuard } from '../../auth/auth.guard';
import { Product } from '@/application/entities/product';
import { CreateProductDto } from './dto/create-product.dto';
import { Auth, CurrentUser } from '../../auth/current-user';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProduct } from '@/application/use-cases/create-product';
import { GetAllProducts } from '@/application/use-cases/get-all-products';
import { GetProductById } from '@/application/use-cases/get-product-by-id';
import { DeleteProductById } from '@/application/use-cases/delete-product-by-id';
import { UpdateProductById } from '@/application/use-cases/update-product-by-id';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProduct: CreateProduct,
    private readonly getAllProducts: GetAllProducts,
    private readonly getProductById: GetProductById,
    private readonly deleteProductById: DeleteProductById,
    private readonly updateProductById: UpdateProductById,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() product: CreateProductDto, @CurrentUser() user: Auth) {
    return this.createProduct.execute({
      ...product,
      userId: user.id,
    });
  }

  @Get()
  async findAll(@CurrentUser() user: Auth) {
    return await this.getAllProducts.execute();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: Auth,
  ): Promise<Product> {
    return await this.getProductById.execute({ id, userId: user.id });
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
    @CurrentUser() user: Auth,
  ) {
    return await this.updateProductById.execute({
      id,
      userId: user.id,
      product,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: Auth,
  ): Promise<void> {
    return await this.deleteProductById.execute({ userId: user.id, id });
  }
}
