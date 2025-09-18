import express from 'express'
import authenticate from '../middlewares/authMiddleware.js';
import {categoryController,getCategoryController} from '../controllers/categoryController.js'
import {createSubCategory,getSubCategoryController} from '../controllers/subCategoryController.js'
import upload from '../middlewares/uploadMiddleware.js';
import {createProduct,getProducts,getProductById,updateProduct} from "../controllers/productControllers.js"

const router = express.Router();
//cetegory
router.post("/category",authenticate, categoryController);
router.get("/category",authenticate, getCategoryController)
//subCategory
router.post("/subCategory",authenticate,createSubCategory )
router.get("/subCategory",authenticate,getSubCategoryController )
//product
router.post("/product",authenticate,upload.fields([{ name: 'image', maxCount: 5 }]),createProduct)
router.get("/product",authenticate, getProducts);
router.get("/:id",authenticate, getProductById); 
router.put("/:id",authenticate, upload.fields([{ name: "image", maxCount: 5 }]),updateProduct) 



export default router