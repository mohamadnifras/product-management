import asyncHandler from "../utils/asyncHandler.js";
import { signInValidation, signUpValidation } from "../utils/validators.js"
import CustomError from "../utils/customError.js";
import { signUpServices, signInServices, getUserDetails, logoutUserServices } from "../services/authServices.js"
import { generateAccessToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";



const signUpController = asyncHandler(async (req, res) => {
    const { name, email, password,} = req.body;
    console.log("password:", password)
    const { error } = signUpValidation.validate({ name, email, password, });
    if (error) throw new CustomError(error.details[0].message, 400);
    const user = await signUpServices({ name, email, password })
    
    //send response
    res.status(201).json({
        message: 'User registered successfully', user,
    });

});

const signInController = asyncHandler(async (req, res) => {
    console.log("BODY RECEIVED:", req.body);
    const { email, password } = req.body;
    const { error } = signInValidation.validate({ email, password });
    if (error) throw new CustomError(error.details[0].message, 400);
    const { accessToken, refreshToken, user } = await signInServices({ email, password })
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'None',
        maxAge: 5 * 60 * 1000, //5 minutese
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    })

    res.status(200).json({
        message: 'Login Successfully', user,
    });
});

const getLoggedInUser = asyncHandler(async (req,res) => {
    const user = await getUserDetails(req.user.id);
    if (!user) {
        throw new CustomError("User not found", 404)
    }

    res.status(200).json({ user })

});

const logoutUser = asyncHandler(async (req, res) => {
    await logoutUserServices();

    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: '/'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: '/'
    });

    res.status(200).json({ message: 'Logged out successfully' });
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        throw new CustomError('Refresh token not found', 401);
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const newAccessToken = generateAccessToken({ id: decoded.id, email: decoded.email });

        // Set the new access token as a cookie
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 5 * 60 * 1000, //5 minutese
        });
        console.log(newAccessToken, "newAccessToken")

        res.status(200).json({ message: 'Token refreshed successfully' });
    } catch (err) {
        throw new CustomError('Invalid or expired refresh token', 401);
    }
});





export { signUpController, signInController, getLoggedInUser, logoutUser, refreshAccessToken }