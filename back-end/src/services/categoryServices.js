import Category from "../models/categoryModel.js";
import CustomError from "../utils/customError.js";

const categoryServices = async (name) => {
  const existingCategory = await Category.findOne({ name })
  if (existingCategory) {
    throw new CustomError("Category already exists", 400);
  }
  try {
    const category = await Category.create({ name });
    return category;
  } catch (error) {
    throw new CustomError(error, 500);
  }

}

const categoryServicesGet = async () => {
  try {
    const categories = await Category.find(); // fetch all categories
    return categories;
  } catch (error) {
    throw new CustomError("Failed to fetch categories", 500);
  }
};


export { categoryServices, categoryServicesGet }