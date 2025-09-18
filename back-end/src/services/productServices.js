import SubCategory from "../models/subCategoryModal.js";
import Product from "../models/productModal.js";
import CustomError from "../utils/customError.js";


const productService = async({ title, description, subCategoryName, variants, images })=>{

  const subCategory = await SubCategory.findOne({ name: subCategoryName }).populate("category");
  console.log("subCategory:" ,subCategory)
  if (!subCategory) throw new CustomError("SubCategory not found", 404);
   // category is inside subCategory.category
  const categoryId = subCategory.category._id;

 const existingProduct = await Product.findOne({
    title: title.trim(),
    subCategory: subCategory._id,
  });

  if (existingProduct) {
    throw new CustomError("Product already exists", 400);
  }

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


const getProductsService = async (page, limit,subCategoryIds = []) => {
  const skip = (page - 1) * limit;

  
 const filter = subCategoryIds.length > 0 ? { subCategory: { $in: subCategoryIds } } : {};

  const total = await Product.countDocuments(filter);


  const products = await Product.find(filter)
    .populate("category", "name")
    .populate("subCategory", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    products,
    total,
    totalPages: Math.ceil(total / limit),
  };
};


 const getProductByIdService = async (id) => {
  const product = await Product.findById(id)
    .populate("subCategory", "name") 
    .exec();

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  return product;
};


const updateProductService = async (
  productId,
  { title, description, subCategoryName, variants, images }
) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  // If subCategoryName is provided, validate it
  let subCategoryId = product.subCategory;
  let categoryId = product.category;

  if (subCategoryName) {
    const subCategory = await SubCategory.findOne({
      name: subCategoryName,
    }).populate("category");

    if (!subCategory) throw new CustomError("SubCategory not found", 404);

    subCategoryId = subCategory._id;
    categoryId = subCategory.category._id;
  }

 
  const finalImages = images.length > 0 ? images : product.images;

  product.title = title || product.title;
  product.description = description || product.description;
  product.variants = variants || product.variants;
  product.images = finalImages;
  product.subCategory = subCategoryId;
  product.category = categoryId;

  await product.save();

  const populatedProduct = await Product.findById(product._id)
    .populate("category", "name")
    .populate("subCategory", "name");

  return populatedProduct;
};


export {productService,getProductsService,getProductByIdService,updateProductService}