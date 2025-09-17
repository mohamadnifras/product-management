import express from 'express'
import authenticate from '../middlewares/authMiddleware.js';
import {categoryController,getCategories} from '../controllers/categoryController.js'
import {createSubCategory,getSubCategory} from '../controllers/subCategoryController.js'
import upload from '../middlewares/uploadMiddleware.js';
import {createProduct} from "../controllers/productControllers.js"

const router = express.Router();
//cetegory
router.post("/cetegory",authenticate, categoryController);
router.get("/cetegory",authenticate, getCategories)
//subCategory
router.post("/subCetegory",authenticate,createSubCategory )
router.get("/subCetegory",authenticate,getSubCategory )
//product
router.post("/product",authenticate,upload.fields([{ name: 'image', maxCount: 5 }]),createProduct)



export default router