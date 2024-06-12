import { Transform } from 'class-transformer';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase().trim())
  readonly category: string;

  @IsNotEmpty()
  readonly description: string;
}
