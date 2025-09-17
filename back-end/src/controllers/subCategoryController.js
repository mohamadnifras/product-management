import asyncHandler from "../utils/asyncHandler.js";
import { subCategoryServices, subCategoryServicesGet } from '../services/subCategoryServices.js'

const createSubCategory = asyncHandler(async (req, res) => {
    const { name, categoryName } = req.body;
    const subCategory = await subCategoryServices(name, categoryName);
    res.status(201).json({
        success: true,
        message: "SubCategory created successfully",
        data: subCategory,
    });

});

const getSubCategoryController = asyncHandler(async (req, res) => {
    const subCategories = await subCategoryServicesGet();
    res.status(200).json({
        success: true,
        message: "SubCategories fetched successfully",
        data: subCategories,
    });
});

export { createSubCategory,getSubCategoryController }