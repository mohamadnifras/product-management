import asyncHandler from "../utils/asyncHandler.js";
import { subCategoryServices } from '../services/subCategoryServices.js'

const createSubCategory = asyncHandler(async (req, res) => {
    const { name, categoryName } = req.body;
    const subCategory = await subCategoryServices(name, categoryName);
    res.status(201).json({
        success: true,
        message: "SubCategory created successfully",
        data: subCategory,
    });

});

const getSubCategory = async () => {
    const subCategories = await SubCategory.find().populate("category");
    res.json(subCategories);
}

export { createSubCategory,getSubCategory }