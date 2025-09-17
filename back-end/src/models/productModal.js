import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  images: [String], 
  variants: [
    {
      sku: String,
      ram: String,
      price: Number,
      qty: Number,
      color: String
    }
  ],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema)
export default Product