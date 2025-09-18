import asyncHandler from "../utils/asyncHandler.js";
import { addToWishlistServices, getWishlistServices, removeFromWishlistServices } from "../services/wishlistServices.js";

const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
    const wishlist = await addToWishlistServices(productId, userId);
    res.status(201).json({ success: true, wishlist });

});

const getWishlist = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const items = await getWishlistServices(userId)
    res.status(200).json({ success: true, items });
})

const removeFromWishlist = asyncHandler(async (req, res) => {
    console.log("aa",req.user.id)
    console.log("aa",req.params)
    const userId = req.user.id
    const { productId } = req.params;
    const wishlist = await removeFromWishlistServices(productId, userId);
    res.status(200).json({ success: true, message: "Removed from wishlist", wishlist });
})

export { addToWishlist, getWishlist, removeFromWishlist }