import * as mongoose from 'mongoose';
import { ProductProps } from '@/application/entities/product';

export const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
});
