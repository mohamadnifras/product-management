import express from "express"
import auth from "./authRoutes.js"
import product from "./productRoutes.js"
import wishlist from "./wishlistRouter.js"


const router = express.Router()

router.use("/auth", auth)
router.use("/product", product)
router.use("/wishlist",wishlist)

export default router