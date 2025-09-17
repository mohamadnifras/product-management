import asyncHandler from "../utils/asyncHandler.js";
import {productService} from "../services/productServices.js"


const createProduct = asyncHandler(async () => {
    const { title, description, subCategoryName, variants } = req.body;
    // parse variants (if sent as string in Postman)
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


export { createProduct }

