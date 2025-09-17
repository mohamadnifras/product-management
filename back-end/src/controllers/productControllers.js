import asyncHandler from "../utils/asyncHandler.js";
import {productService,getProductsService} from "../services/productServices.js"


const createProduct = asyncHandler(async (req,res) => {
    const { title, description, subCategoryName, variants } = req.body;
    
    const parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;
    const images = req.files?.image?.map((file) => file.path) || [];
    const product = await productService({
        title,
        description,
        subCategoryName,
        variants: parsedVariants,
        images,
    });

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
    });
});


const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;   
  const limit = parseInt(req.query.limit) || 10; 

  const { products, total, totalPages } = await getProductsService(page, limit);

  res.status(200).json({
    success: true,
    page,
    totalPages,
    total,
    count: products.length,
    data: products,
  });
});


export { createProduct,getProducts }

