import CustomError from "../utils/customError.js";
import Category from "../models/categoryModel.js";
import SubCategory from "../models/subCategoryModal.js";

const subCategoryServices = async (name, categoryName) => {
    try {
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            throw new CustomError("Category not found", 404)
        }
        const existingSubCategory = await SubCategory.findOne({
            name,
            category: category._id,
        });

        if (existingSubCategory) {
            throw new CustomError("SubCategory already exists in this category", 400);
        }
        const subCategory = SubCategory.create({
            name,
            category: category._id,
        })
        return subCategory
    } catch (error) {
     throw new CustomError(error)
    }
}

export { subCategoryServices }
