import SubCategory from "../models/subCategoryModal.js";
import Product from "../models/productModal.js";
import CustomError from "../utils/customError.js";


const productService = async({ title, description, subCategoryName, variants, images })=>{
  const subCategory = await SubCategory.findOne({ name: subCategoryName }).populate("category");
  if (!subCategory) throw new CustomError("SubCategory not found", 404);
   // category is inside subCategory.category
  const categoryId = subCategory.category._id;

  // create product
  const product = await Product.create({
    title,
    description,
    category: categoryId,
    subCategory: subCategory._id,
    variants,
    images,
  });

  
  const populatedProduct = await Product.findById(product._id)
    .populate("category", "name")
    .populate("subCategory", "name");

  return populatedProduct;
}

export {productService}