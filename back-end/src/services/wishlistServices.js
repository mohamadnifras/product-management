import CustomError from "../utils/customError.js";
import Wishlist from "../models/wishlistModel.js";
import mongoose from "mongoose";


const addToWishlistServices = async (productId, userId) => {
    const existing = await Wishlist.findOne({ user: userId, product: productId });
    if (existing) {
        throw new CustomError("Already in wishlist", 400)
    }
    try {
        const wishlist = await Wishlist.create({
            user: userId,
            product: productId,
        });
        return wishlist
    } catch (error) {
        throw new CustomError(error)
    }
}


const getWishlistServices = async (userId) => {
    try {
        const items = await Wishlist.find({ user: userId }).populate("product");
        if (!items) {
            throw new CustomError("item not fount", 400)
        }
        return items
    } catch (error) {
        throw new CustomError(error)
    }
}


const removeFromWishlistServices = async (productId, userId) => {
    try {
        const item = await Wishlist.findOneAndDelete({ user: userId, product: productId });
        if (!item) throw new CustomError("Wishlist item not found", 404);
        return item;
    } catch (error) {
        throw new CustomError(error)
    }
}


export { addToWishlistServices, getWishlistServices, removeFromWishlistServices }
