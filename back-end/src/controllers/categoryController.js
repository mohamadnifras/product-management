import asyncHandler from "../utils/asyncHandler.js";
import { categoryServices } from '../services/categoryServices.js'

const categoryController = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await categoryServices(name)
    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
    });
})

const getCategories = async () => {
    const categories = await Category.find();
    res.json(categories);
}

export { categoryController, getCategories }