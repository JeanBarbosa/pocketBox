import { IsEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  category?: string;

  @IsOptional()
  description?: string;
}
