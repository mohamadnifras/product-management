import express from "express"
import authenticate from "../middlewares/authMiddleware.js"
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistControllers.js";



const router = express.Router();

router.post("/", authenticate, addToWishlist)
router.get("/", authenticate, getWishlist)
router.delete("/:productId", authenticate, removeFromWishlist)


export default router