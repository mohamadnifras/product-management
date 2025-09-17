import jwt from "jsonwebtoken"
import CustomError from "../utils/customError.js"
import User from "../models/userModel.js"

const authenticate = (async (req, res, next) => {
    try {
        let token = req.cookies.accessToken;

        if (!token) {
            throw new CustomError('Access denied. No token provided', 401)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new CustomError('Invalid or expired access token', 403)
        }

        req.user = await User.findById(decoded.id)
        if (!req.user) {
            throw new CustomError('User not found', 404)
        }

        next();
    } catch (err) {
   if (err.name === 'TokenExpiredError') {
      return next(new CustomError('Access token expired, please refresh your token', 401));
    } else {
      return next(new CustomError('Not authorized, token invalid', 401));
    }
  }


})

export default authenticate