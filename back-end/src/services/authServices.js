
import User from "../models/userModel.js"
import CustomError from "../utils/customError.js"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"


const signUpServices = async ( {name, email, password} ) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new CustomError('Email already registered', 400);
    }
    try {
        const user = await User.create({ name, email, password });
        return { id: user._id, name: user.name, email: user.email }
    } catch (error) {
        console.log(error, 'error')
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            throw new CustomError(`The ${field} "${error.keyValue[field]}" is already taken. Please use a different one.`, 400);
        }
        throw new CustomError('Error registering user', 500)
    }
};

const signInServices = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError('Email not found. Please create an account.', 400)
    }

    // Check password match
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new CustomError('Invalid password. Please try again.', 400);
    }

    // Generate tokens
    const accessToken = generateAccessToken({ id: user._id, role: user.role, email: user.email });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role, email: user.email });

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            email: user.email
        }
    };
};


const getUserDetails = async (id) => {

    const user = await User.findById(id).select("username")
    return user
}

const logoutUserServices = ()=>{
    return true
}

export { signUpServices, signInServices, getUserDetails,logoutUserServices }