import asyncHandler from "../utils/asyncHandler.js";
import { productService, getProductsService, getProductByIdService,updateProductService } from "../services/productServices.js"


const createProduct = asyncHandler(async (req, res) => {
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
    const subCategoryIds = req.query.subCategoryIds
    ? req.query.subCategoryIds.split(",")
    : [];

    const { products, total, totalPages } = await getProductsService(page, limit,subCategoryIds);

    res.status(200).json({
        success: true,
        page,
        totalPages,
        total,
        count: products.length,
        data: products,
    });
});


const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await getProductByIdService(id);

    res.status(200).json({
        success: true,
        product,
    });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, subCategoryName, variants } = req.body;
    const parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;
    const newImages = req.files?.image?.map((file) => file.path) || [];
    const updatedProduct = await updateProductService(id, {
    title,
    description,
    subCategoryName,
    variants: parsedVariants,
    images: newImages,
  });
  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });

})

export { createProduct, getProducts, getProductById, updateProduct }

