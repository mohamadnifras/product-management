import express from "express"
import auth from "./authRoutes.js"
import product from "./productRoutes.js"


const router = express.Router()

router.use("/auth", auth)
router.use("/product", product)

export default router