import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  userId: String,
  name: String,
  image: String,
  quantity: Number,
  price: Number,
  category: String,
  description: String,
});
