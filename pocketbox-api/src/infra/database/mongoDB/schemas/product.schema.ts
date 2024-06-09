import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  userId: String,
  price: Number,
  category: String,
  description: String,
});
