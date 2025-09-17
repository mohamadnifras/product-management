import asyncHandler from "../utils/asyncHandler.js";
import { categoryServices, categoryServicesGet } from '../services/categoryServices.js'

const categoryController = asyncHandler(async (req, res) => {
    console.log("category:",req.body)
    const { name } = req.body;
    const category = await categoryServices(name)
    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
    });
})



const getCategoryController = asyncHandler(async (req, res) => {
    const categories = await categoryServicesGet();
    res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
    });
});

export { categoryController, getCategoryController }